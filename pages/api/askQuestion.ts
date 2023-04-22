import query from "@/utils/queryAPI";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from 'firebase-admin';
import { adminDb } from "@/firebaseAdmin";

type Data = {
    answer : string
}

export default async function handler(
        req: NextApiRequest, 
        res: NextApiResponse<Data>
    ) {

    const { prompt, id, model,  session } = req.body;

    if(!prompt) {
        res.status(400).json({ answer: 'provide the prompt' });
        return;
    }
    if(!id){
        res.status(400).json({ answer: 'provide valid i d' });
        return;
    }

    //chatGPT query 
    const response = await query(prompt,model);

    const message: Message = {
        text: response || "chatGPT unable to fetch answer",
        createdAt : admin.firestore.Timestamp.now(),
        user : {
            _id : 'ChatGPT',
            name : 'ChatGPT',
            avatar : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png'
        }
    }

    await adminDb.collection("users").doc(session?.user?.email).collection("chats").doc(id).collection("messages").add(message);

    res.status(200).json({ answer: message.text });
}