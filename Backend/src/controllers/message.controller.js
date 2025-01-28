export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
};

export const getMessages = async (req, res) => {
    try{
        const {id:userToChatId}=req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {sender: myId,receiver: userToChatId},
                {sender: userToChatId,receiver: myId}
            ]
        });
        res.status(200).json(messages);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
};


export const sendMessage = async (req, res) => {
    try{
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;
    
    if (image){
        const uploadedResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadedResponse.secure_url;
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    }
    );
    await newMessage.save();

    //socket.io code 

    res.status(200).json(newMessage);
    

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
}