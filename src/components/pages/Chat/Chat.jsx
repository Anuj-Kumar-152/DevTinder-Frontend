import { useParams } from 'react-router-dom';
import "./Chat.css";
import { useEffect, useRef, useState } from 'react';
import { createSocketConnection } from '../../utils/socket';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../../../api';

const Chat = () => {
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState("");
    const messagesEndRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axiosInstance.get(`/chat/${targetUserId}`, { withCredentials: true });
                const chatMessages = res.data.messages.map(msg => {
                    const sender = typeof msg.senderId === "object" ? msg.senderId : { _id: msg.senderId };
                    return {
                        firstName: sender.firstName || "",
                        lastName: sender.lastName || "",
                        text: msg.text,
                        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        sentByMe: sender._id.toString() === userId.toString(),
                    };
                });
                setMessages(chatMessages);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();
    }, [targetUserId, userId]);

    // Socket setup
    useEffect(() => {
        if (!userId) return;
        const socket = createSocketConnection();
        socketRef.current = socket;
        socket.emit("joinChat", { userId, targetUserId });

        socket.on("messageReceived", ({ firstName, lastName, text, senderId, createdAt }) => {
            // Prevent duplicates
            setMessages(prev => {
                if (prev.length && prev[prev.length - 1].text === text && prev[prev.length - 1].sentByMe && senderId === userId) {
                    return prev;
                }
                return [...prev, {
                    firstName,
                    lastName,
                    text,
                    time: new Date(createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    sentByMe: senderId.toString() === userId.toString(),
                }];
            });
        });

        return () => socket.disconnect();
    }, [userId, targetUserId]);

    const sendMessage = () => {
        if (!newMessages.trim()) return;
        socketRef.current.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessages,
        });
        setNewMessages("");
    };

    return (
        <div className="chat-container">
            <h1>Chat</h1>
            <div className="chat-box">
                <div className="messages-area">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message-bubble ${msg.sentByMe ? "sent" : "received"}`}>
                            {!msg.sentByMe && (msg.firstName || msg.lastName) && (
                                <div className="sender-name">{msg.firstName} {msg.lastName}</div>
                            )}
                            <div className="message-text">{msg.text}</div>
                            <div className="message-time">{msg.time}</div>
                        </div>
                         
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="chat-input-section">
                    <input
                        type="text"
                        value={newMessages}
                        onChange={e => setNewMessages(e.target.value)}
                        placeholder="Type a message..."
                        className="chat-input"
                        onKeyDown={e => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage} className="send-btn">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;











// import { useParams } from 'react-router-dom';
// import "./Chat.css";
// import { useEffect, useState } from 'react'; 
// import { createSocketConnection } from '../../utils/socket';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { BASE_URL } from '../../utils/constants';

// const Chat = () => {

//     const user = useSelector((store) => store.user);
//     const userId = user?._id;
//     const { targetUserId } = useParams();
//     const [messages, setMessages] = useState([]);
//     const [newMessages, setNewMessages] = useState("");

//     const fetchChatMessages = async () => {
//         const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//             withCredentials: true,
//         });
//         console.log(chat.data.messages);

//         const chatMessages = chat?.data?.messages?.map(msg => {
//             const {senderId, text} = msg;
//             return {
//                 firstName: senderId?.firstName,
//                 lastName: senderId?.lastName,
//                 text,
//             };
//         });
//         setMessages(chatMessages);
//     }

//     useEffect(() => {
//         fetchChatMessages();
//     }, [])

//     useEffect( () => {

//         if(!userId){
//             return ;
//         }

//         const socket = createSocketConnection();
//         socket.emit("joinChat", {userId, targetUserId});

//         socket.on("messageReceived", ({firstName, lastName, text}) => {
//             console.log(firstName + " : " + text);

//             setMessages((messages) => [...messages, {firstName, lastName, text}]);
//         })
        
//         return () => {
//             socket.disconnect();
//         };

//     }, [userId, targetUserId]);
    
//     const sendMessage = () => {
//         const socket = createSocketConnection();
//         socket.emit("sendMessage", {
//             firstName: user.firstName, 
//             userId, 
//             targetUserId, 
//             text: newMessages, 
//         })
//         setNewMessages("");
//     }

//     return (
//         <div className="chat-container">
//             <h1>Chat</h1>
            
//             <div className="chat-box">
//                 <div className="messages-area">
//                     {messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`message-bubble ${msg.sentByMe ? "sent" : "received"}`}
//                         >
//                             {/* <p>{firstName + " " + lastName}</p> */}
//                             <p className="message-text">{msg.text}</p>
//                             <span className="message-time">{msg.time}</span>
//                         </div>
//                     ))}
//                 </div>
                
//                 <div className="chat-input-section">
//                     <input 
//                         type="text" 
//                         value={newMessages}
//                         onChange={(e) => setNewMessages(e.target.value)}
//                         placeholder="Type a message..." 
//                         className="chat-input"
//                     /> 
//                     <button onClick={sendMessage} className="send-btn">Send</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Chat;
