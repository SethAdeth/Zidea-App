import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


export const POST = async (req) => {
    const { userid, prompt, tag} = await req.json();

    try {
        await connectToDB();
        const newPrompt = await new Prompt({
            creator: userid,
            prompt,
            tag
        });
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response("failed to create a new prompt", { status: 500})
    }
}