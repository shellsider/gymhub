import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const genAI = new GoogleGenerativeAI('AIzaSyBCns8R8uqCoXfaD4ejT7ClWc9qDOFQ0jo');
const YOUTUBE_API_KEY = 'AIzaSyAK7dnz3Y5y43JIeK9oeW711JL2FCPoWPs';

/**
 * POST /api/workout-chatbot
 * This route generates workout recommendations for the chatbot with YouTube video links
 * Expects: { message: string }
 * Returns: { data: string }
 */
export async function POST(req) {
    try {
        const { message } = await req.json();

        // 1. Get workout plan from Gemini
        const workoutPlan = await getWorkoutPlanFromGemini(message);

        // 2. Extract exercises from the workout plan
        const exercises = extractExercisesFromPlan(workoutPlan);

        console.log("Chatbot - Extracted exercises:", exercises);

        // 3. Find YouTube videos for each exercise
        const exerciseWithVideos = await findYouTubeVideosForExercises(exercises);

        console.log("Chatbot - Found videos for exercises:", exerciseWithVideos.map(e => e.name));

        // 4. Enhance the workout plan with video links
        const enhancedWorkoutPlan = enhanceWorkoutPlanWithVideos(workoutPlan, exerciseWithVideos);

        return NextResponse.json({ data: enhancedWorkoutPlan });
    } catch (error) {
        console.error("Error processing workout with videos:", error);
        return NextResponse.json(
            { error: "Failed to process request", details: error.message },
            { status: 500 }
        );
    }
}

/**
 * Gets a workout plan from Gemini based on user's message
 */
async function getWorkoutPlanFromGemini(message) {
    // Create a prompt instructing Gemini how to format its response
    const prompt = `
    You are a fitness expert assistant for GymHub. A user has asked for workout advice.
    
    Create a customized workout plan based on the user's request: "${message}"
    
    Instructions:
    1. Identify the user's goals, preferred body parts to train, or any specific requirements in their message
    2. Create a structured workout plan with specific exercises
    3. For each exercise:
       - Explain proper form & step-by-step process
       - List common mistakes people make
       - Mention the target muscles
    
    IMPORTANT: Format each exercise with a clear heading using markdown's ## heading style, and include the name of the exercise in the heading.
    CRUCIAL: Make sure each exercise has its own separate ## heading, not a subheading or any other formatting.
    Format your response in Markdown with headings, bullet points, and line breaks.
    
    If there's not enough information in the user's request, make reasonable assumptions and explain them.
    `;

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Make a direct content generation call
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
}

/**
 * Extracts exercise names from a workout plan
 */
function extractExercisesFromPlan(plan) {
    // First, let's split the content by markdown level 2 headings
    const sections = plan.split(/(?=^## )/m);

    const exercises = [];

    // Process each section to extract exercise names
    for (const section of sections) {
        // Skip empty sections
        if (!section.trim()) continue;

        // Get the first line which should be the heading
        const firstLine = section.split('\n')[0];

        // Extract exercise name from the heading
        const match = firstLine.match(/^## (.*?)$/);
        if (match && match[1]) {
            const exerciseName = match[1].trim();

            // Filter out non-exercise headings
            if (!exerciseName.toLowerCase().includes('warm-up') &&
                !exerciseName.toLowerCase().includes('warm up') &&
                !exerciseName.toLowerCase().includes('cool down') &&
                !exerciseName.toLowerCase().includes('cooldown') &&
                !exerciseName.toLowerCase().includes('cardio') &&
                !exerciseName.toLowerCase().includes('introduction') &&
                !exerciseName.toLowerCase().includes('workout plan') &&
                !exerciseName.toLowerCase().includes('conclusion')) {

                exercises.push(exerciseName);
            }
        }
    }

    return exercises;
}

/**
 * Finds YouTube videos for a list of exercises
 */
async function findYouTubeVideosForExercises(exercises) {
    const exerciseWithVideos = [];

    // Process exercises in batches to avoid rate limiting
    for (const exercise of exercises) {
        try {
            const searchQuery = `${exercise} proper form tutorial`;
            const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 1,
                    q: searchQuery,
                    type: 'video',
                    key: YOUTUBE_API_KEY,
                    videoEmbeddable: true
                }
            });

            if (response.data.items && response.data.items.length > 0) {
                const video = response.data.items[0];

                // Get additional video details (duration, view count, etc)
                const videoDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                    params: {
                        part: 'snippet,contentDetails,statistics',
                        id: video.id.videoId,
                        key: YOUTUBE_API_KEY
                    }
                });

                let videoDetails = {};
                if (videoDetailsResponse.data.items && videoDetailsResponse.data.items.length > 0) {
                    const details = videoDetailsResponse.data.items[0];
                    videoDetails = {
                        duration: details.contentDetails?.duration || '',
                        viewCount: details.statistics?.viewCount || '0',
                        channelTitle: details.snippet?.channelTitle || 'YouTube Channel'
                    };
                }

                exerciseWithVideos.push({
                    name: exercise,
                    videoId: video.id.videoId,
                    title: video.snippet.title,
                    thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url,
                    channelTitle: video.snippet.channelTitle,
                    description: video.snippet.description,
                    publishedAt: video.snippet.publishedAt,
                    details: videoDetails,
                    url: `https://www.youtube.com/watch?v=${video.id.videoId}`
                });

                // Add a small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 200));
            } else {
                exerciseWithVideos.push({
                    name: exercise,
                    videoId: null,
                    title: null,
                    url: null
                });
            }
        } catch (error) {
            console.error(`Error fetching video for ${exercise}:`, error);
            exerciseWithVideos.push({
                name: exercise,
                videoId: null,
                title: null,
                url: null,
                error: error.message
            });
        }
    }

    return exerciseWithVideos;
}

/**
 * Enhances a workout plan with YouTube video links
 */
function enhanceWorkoutPlanWithVideos(workoutPlan, exerciseWithVideos) {
    let enhancedPlan = workoutPlan;

    console.log("Chatbot - Enhancing plan with videos for exercises:", exerciseWithVideos.map(e => e.name));

    for (const exercise of exerciseWithVideos) {
        if (exercise.url) {
            // More specific regex to match exactly the heading
            const headingRegex = new RegExp(`^## ${escapeRegExp(exercise.name)}$`, 'm');

            if (headingRegex.test(enhancedPlan)) {
                // Format a more detailed video section with thumbnail and metadata
                let videoSection = `\n\n📺 **Watch Video Tutorial**: [${exercise.title}](${exercise.url})`;

                // Add video metadata if available
                if (exercise.channelTitle) {
                    videoSection += `\n\n**Channel**: ${exercise.channelTitle}`;
                }

                // Add view count if available
                if (exercise.details && exercise.details.viewCount) {
                    const viewCount = parseInt(exercise.details.viewCount).toLocaleString();
                    videoSection += ` • ${viewCount} views`;
                }

                // Insert the video section after the heading
                enhancedPlan = enhancedPlan.replace(
                    headingRegex,
                    `## ${exercise.name}${videoSection}`
                );
            } else {
                console.log(`Chatbot - Could not find exact heading match for: "${exercise.name}"`);

                // Try a more flexible match as fallback
                const flexibleHeadingRegex = new RegExp(`## [^\\n]*${escapeRegExp(exercise.name)}[^\\n]*`, 'i');

                if (flexibleHeadingRegex.test(enhancedPlan)) {
                    const matchedHeading = enhancedPlan.match(flexibleHeadingRegex)[0];

                    // Format video section
                    let videoSection = `\n\n📺 **Watch Video Tutorial**: [${exercise.title}](${exercise.url})`;

                    if (exercise.channelTitle) {
                        videoSection += `\n\n**Channel**: ${exercise.channelTitle}`;
                    }

                    if (exercise.details && exercise.details.viewCount) {
                        const viewCount = parseInt(exercise.details.viewCount).toLocaleString();
                        videoSection += ` • ${viewCount} views`;
                    }

                    // Insert the video section after the matched heading
                    enhancedPlan = enhancedPlan.replace(
                        matchedHeading,
                        `${matchedHeading}${videoSection}`
                    );
                } else {
                    console.log(`Chatbot - Could not find flexible match for: "${exercise.name}"`);
                }
            }
        }
    }

    return enhancedPlan;
}

/**
 * Escapes special characters in a string for use in a regex pattern
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} 