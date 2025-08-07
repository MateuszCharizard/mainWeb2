import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// --- Global Styles & Animations ---
const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
            animation: fadeInUp 0.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) forwards;
        }
        
        @keyframes popIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        .animate-popIn {
            animation: popIn 0.3s ease-out forwards;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.4);
            border-radius: 20px;
        }
        .dark ::-webkit-scrollbar-thumb {
            background-color: rgba(107, 114, 128, 0.4);
        }
        
        /* High Contrast Styles */
        .high-contrast {
             --hc-text: #FFFFFF;
             --hc-bg: #000000;
             --hc-accent: #FFFF00;
             --hc-border: #FFFFFF;
             background-color: var(--hc-bg) !important;
             color: var(--hc-text) !important;
        }
        .high-contrast button, .high-contrast input, .high-contrast div, .high-contrast header, .high-contrast footer, .high-contrast span {
             border-color: var(--hc-border) !important;
        }
        .high-contrast .hc-accent-text { color: var(--hc-accent) !important; }
        .high-contrast .hc-accent-bg { background-color: var(--hc-accent) !important; color: var(--hc-bg) !important; }

    `}</style>
);


// --- Context for App State ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [supabase, setSupabase] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initError, setInitError] = useState(null);

    useEffect(() => {
        const supabaseUrl = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        if (document.querySelector(`script[src="${supabaseUrl}"]`)) {
            if (window.supabase) {
                setSupabase(window.supabase.createClient('https://fiactfacsuqmnngftvjl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWN0ZmFjc3VxbW5uZ2Z0dmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDQ1MjYsImV4cCI6MjA2ODY4MDUyNn0.KSrUogaOx8Bbq3tPAQ0tOJfhDH9GJH7kjuP7TTlRjcQ'));
            }
            return;
        }
        const script = document.createElement('script');
        script.src = supabaseUrl;
        script.async = true;
        script.onload = () => {
            if (window.supabase) {
                setSupabase(window.supabase.createClient('https://fiactfacsuqmnngftvjl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpYWN0ZmFjc3VxbW5uZ2Z0dmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDQ1MjYsImV4cCI6MjA2ODY4MDUyNn0.KSrUogaOx8Bbq3tPAQ0tOJfhDH9GJH7kjuP7TTlRjcQ'));
            } else {
                setInitError("Failed to initialize chat service.");
                setLoading(false);
            }
        };
        script.onerror = () => {
            setInitError("Failed to load chat service script.");
            setLoading(false);
        };
        document.body.appendChild(script);
        return () => {
            const scriptTag = document.querySelector(`script[src="${supabaseUrl}"]`);
            if (scriptTag) document.body.removeChild(scriptTag);
        };
    }, []);

    useEffect(() => {
        if (!supabase) return;
        const fetchUserProfile = async (sessionUser) => {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', sessionUser.id).single();
            setUser(profile || null);
            setLoading(false);
        };
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                fetchUserProfile(session.user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });
        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, [supabase]);

    const value = { supabase, user, setUser, loading, setLoading, initError };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- Accessibility Provider & Context ---
const AccessibilityContext = createContext();
const AccessibilityProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(16);
    const [theme, setTheme] = useState('light');
    const [reduceMotion, setReduceMotion] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [font, setFont] = useState('font-sans');

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    const toggleReduceMotion = () => setReduceMotion(prev => !prev);
    const toggleHighContrast = () => setHighContrast(prev => !prev);

    useEffect(() => {
        document.body.className = ''; // Reset classes
        document.body.classList.add(theme, font);
        if (highContrast) document.body.classList.add('high-contrast');
    }, [theme, font, highContrast]);

    const value = { fontSize, setFontSize, theme, toggleTheme, reduceMotion, toggleReduceMotion, highContrast, toggleHighContrast, font, setFont };
    return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

// --- Main App Component ---
export default function AppWrapper() {
    return (
        <>
            <GlobalStyles />
            <AccessibilityProvider>
                <AppProvider>
                    <App />
                </AppProvider>
            </AccessibilityProvider>
        </>
    );
}

function App() {
    const { user, setUser, supabase, loading, setLoading, initError } = useContext(AppContext);

    const handleLogin = async (username, profilePicture) => {
        if (!supabase) return;
        setLoading(true);
        try {
            const { data: { user: authUser }, error: authError } = await supabase.auth.signInAnonymously();
            if (authError) throw authError;
            let profilePictureUrl = `https://placehold.co/128x128/4f46e5/ffffff?text=${username.charAt(0).toUpperCase()}`;
            if (profilePicture) {
                const filePath = `public/${authUser.id}/${Date.now()}-${profilePicture.name}`;
                const { error: uploadError } = await supabase.storage.from('profile_pictures').upload(filePath, profilePicture);
                if (uploadError) throw uploadError;
                const { data } = supabase.storage.from('profile_pictures').getPublicUrl(filePath);
                profilePictureUrl = data.publicUrl;
            }
            const { data: profile, error: profileError } = await supabase.from('profiles').insert({ id: authUser.id, username, profile_picture_url: profilePictureUrl, message_count: 0 }).select().single();
            if (profileError) throw profileError;
            setUser(profile);
        } catch (error) {
            console.error("Error during login:", error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">Loading...</div>;
    }
    if (initError) {
        return <div className="flex items-center justify-center h-screen bg-red-100 text-red-800 p-4 text-center">{initError}</div>;
    }

    return <div className="h-screen bg-slate-100 dark:bg-slate-900">{user ? <Chat /> : <Login onLogin={handleLogin} />}</div>;
}

// --- Login Component ---
function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) onLogin(username, profilePicture);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-slate-100 dark:bg-slate-900 p-4 transition-colors duration-300">
             <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl animate-popIn">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Join the Conversation</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Create your profile to start chatting.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <div className="relative group">
                             <img src={preview || 'https://placehold.co/128x128/4f46e5/ffffff?text=PFP'} alt="Profile preview" className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg transition-transform group-hover:scale-105"/>
                             <button type="button" onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                             </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    </div>
                    <input id="username" type="text" required className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105 active:scale-100">Let's Go!</button>
                </form>
            </div>
        </div>
    );
}

// --- Chat Component ---
function Chat() {
    const { user, setUser, supabase } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const messagesEndRef = useRef(null);
    const lastMessageTimestamp = useRef(new Date().toISOString());
    const { fontSize, reduceMotion } = useContext(AccessibilityContext);

    useEffect(() => {
        if (!supabase) return;
        const fetchInitialData = async () => {
            const { data, error } = await supabase.from('messages').select('*, profile:profiles(*)').order('created_at', { ascending: true });
            if (!error && data) {
                const profilesMap = data.reduce((acc, msg) => { if (msg.profile) acc[msg.user_id] = msg.profile; return acc; }, {});
                setProfiles(profilesMap);
                setMessages(data);
                if (data.length > 0) lastMessageTimestamp.current = data[data.length - 1].created_at;
            }
        };
        fetchInitialData();
        const fetchNewMessages = async () => {
            const { data, error } = await supabase.from('messages').select('*, profile:profiles(*)').gt('created_at', lastMessageTimestamp.current).order('created_at', { ascending: true });
            if (!error && data?.length > 0) {
                const newProfiles = data.reduce((acc, msg) => { if (msg.profile && !profiles[msg.user_id]) acc[msg.user_id] = msg.profile; return acc; }, {});
                if(Object.keys(newProfiles).length > 0) setProfiles(p => ({...p, ...newProfiles}));
                setMessages(current => [...current, ...data]);
                lastMessageTimestamp.current = data[data.length - 1].created_at;
            }
        };
        const intervalId = setInterval(fetchNewMessages, 3000);
        return () => clearInterval(intervalId);
    }, [supabase]);

    useEffect(() => {
        if (!reduceMotion) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        else messagesEndRef.current?.scrollIntoView();
    }, [messages, reduceMotion]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if ((!newMessage.trim() && !imageFile) || !supabase) return;
        let imageUrl = null;
        if (imageFile) {
            const filePath = `public/${user.id}/${Date.now()}_${imageFile.name}`;
            const { error } = await supabase.storage.from('chat_images').upload(filePath, imageFile);
            if (error) return console.error("Image upload error:", error);
            const { data } = supabase.storage.from('chat_images').getPublicUrl(filePath);
            imageUrl = data.publicUrl;
        }
        const { data: inserted, error } = await supabase.from('messages').insert({ content: newMessage, image_url: imageUrl, user_id: user.id }).select();
        if (!error && inserted?.length > 0) {
             setMessages(current => [...current, { ...inserted[0], profile: user }]);
             lastMessageTimestamp.current = inserted[0].created_at;
             const { error: rpcError } = await supabase.rpc('increment_message_count', { user_id_to_update: user.id });
             if (!rpcError) setUser(curr => ({ ...curr, message_count: curr.message_count + 1 }));
        }
        setNewMessage('');
        setImageFile(null);
        document.getElementById('image-upload').value = '';
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300" style={{ fontSize: `${fontSize}px` }}>
            <header className="flex items-center justify-between p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg shadow-sm z-10 border-b border-slate-200 dark:border-slate-700">
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">Global Chat</h1>
                <AccessibilitySettings />
            </header>
            <main className="flex-1 overflow-y-auto p-4 space-y-5">
                {messages.map((msg) => <Message key={msg.id} message={msg} />)}
                <div ref={messagesEndRef} />
            </main>
            <footer className="p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-t border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-3 rounded-full border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                    <label htmlFor="image-upload" className="cursor-pointer p-3 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg></label>
                    <input id="image-upload" type="file" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" />
                    <button type="submit" className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-transform transform hover:scale-110 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:scale-100" disabled={!newMessage.trim() && !imageFile}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg></button>
                </form>
                {imageFile && <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-2">Selected: {imageFile.name}</p>}
            </footer>
        </div>
    );
}

// --- Message Component ---
function Message({ message }) {
    const { user: currentUser } = useContext(AppContext);
    const { reduceMotion } = useContext(AccessibilityContext);
    const { content, image_url, user_id, profile } = message;
    const isCurrentUser = user_id === currentUser.id;
    const { fontSize } = useContext(AccessibilityContext);

    const getMilestoneStyle = () => {
        const count = isCurrentUser ? currentUser.message_count : profile?.message_count || 0;
        if (count >= 1000) return { nameColor: 'text-red-500 dark:text-red-400 font-bold hc-accent-text', pfpBorder: 'border-4 border-red-400/80' };
        if (count >= 100) return { nameColor: 'text-amber-500 dark:text-amber-400 font-bold hc-accent-text', pfpBorder: 'border-4 border-amber-400/80' };
        return { nameColor: 'text-slate-600 dark:text-slate-300', pfpBorder: 'border-2 border-slate-200 dark:border-slate-700' };
    };

    const { nameColor, pfpBorder } = getMilestoneStyle();
    const pfpUrl = isCurrentUser ? currentUser.profile_picture_url : profile?.profile_picture_url;
    const username = isCurrentUser ? currentUser.username : profile?.username;

    return (
        <div className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''} ${!reduceMotion ? 'animate-fadeInUp' : ''}`}>
            <img src={pfpUrl || 'https://placehold.co/48x48/4f46e5/ffffff?text=U'} alt={username} className={`w-10 h-10 rounded-full object-cover shadow-sm ${pfpBorder} transition-all`} />
            <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                <span className={`font-medium text-sm ${nameColor}`} style={{ fontSize: `${fontSize * 0.85}px` }}>{username}</span>
                <div className={`mt-1 p-3 rounded-2xl max-w-xs md:max-w-md shadow-sm ${isCurrentUser ? 'bg-indigo-600 text-white rounded-br-none hc-accent-bg' : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-none'}`}>
                    {content && <p className="leading-relaxed" style={{ fontSize: `${fontSize}px` }}>{content}</p>}
                    {image_url && <img src={image_url} alt="Uploaded content" className="mt-2 rounded-lg max-w-full h-auto" />}
                </div>
            </div>
        </div>
    );
}

// --- AccessibilitySettings Component ---
function AccessibilitySettings() {
    const { fontSize, setFontSize, theme, toggleTheme, reduceMotion, toggleReduceMotion, highContrast, toggleHighContrast, font, setFont } = useContext(AccessibilityContext);
    const [isOpen, setIsOpen] = useState(false);

    const fontOptions = [ { value: 'font-sans', label: 'Sans' }, { value: 'font-serif', label: 'Serif' }, { value: 'font-mono', label: 'Mono' } ];

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" /></svg>
            </button>
            {isOpen && (
                <div className={`absolute right-0 mt-2 w-72 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-20 origin-top-right transition-all duration-300 ${!reduceMotion && (isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95')}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Accessibility</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Font Size: {fontSize}px</label>
                            <input type="range" min="12" max="24" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Font Style</label>
                            <div className="flex space-x-2">
                                {fontOptions.map(opt => (
                                    <button key={opt.value} onClick={() => setFont(opt.value)} className={`flex-1 py-2 text-sm rounded-lg transition-colors ${font === opt.value ? 'bg-indigo-600 text-white hc-accent-bg' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dark Mode</span>
                            <button onClick={toggleTheme} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme === 'dark' ? 'bg-indigo-600' : 'bg-slate-300'}`}><span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} /></button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">High Contrast</span>
                            <button onClick={toggleHighContrast} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${highContrast ? 'bg-indigo-600' : 'bg-slate-300'}`}><span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${highContrast ? 'translate-x-6' : 'translate-x-1'}`} /></button>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Reduce Motion</span>
                            <button onClick={toggleReduceMotion} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${reduceMotion ? 'bg-indigo-600' : 'bg-slate-300'}`}><span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${reduceMotion ? 'translate-x-6' : 'translate-x-1'}`} /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
