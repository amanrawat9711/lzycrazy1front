import logo from "../assets/logo.png"
import Stories from '../components/StorySlider';

const App = () => {
  const navIcons = [
    { icon: '🏠', label: 'Home' },
    { icon: '📦', label: 'Market' },
    { icon: '🎥', label: 'Video' },
    { icon: '🎞️', label: 'Reels' },
  ];

  const actionIcons = [
    { icon: '🧪', label: 'Test' },
    { icon: '➕', label: 'Add' },
    { icon: '💬', label: 'Chat' },
    { icon: '🔔', label: 'Notifications' },
    { icon: '⚙️', label: 'Settings' },
  ];

  const posts = [
    {
      user: 'Surfiya Zakir',
      time: '3 hours ago',
      content: 'Bacon ipsum dolor amet sirloin jowl turducken pork...',
      image: 'https://via.placeholder.com/600x300',
      likes: '2.8K Likes',
      comments: '22 Comments',
      share: 'Share',
    },
    {
      user: 'Byrom Guitet',
      time: '0.5 hrs ago',
      content: 'hello admin',
      image: null,
      likes: '15 Likes',
      comments: 'Comment',
      share: 'Share',
    },
  ];

  const people = [
    { name: 'Mohannad Zitoune', follow: true, image: 'https://via.placeholder.com/50' },
    { name: 'Hurin Seary', follow: true, image: 'https://via.placeholder.com/50' },
    { name: 'Goria Coast', follow: false, image: 'https://via.placeholder.com/50' },
    { name: 'Davi Goria', follow: false, image: 'https://via.placeholder.com/50' },
  ];

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100"> 
      <div className="w-full bg-white shadow flex justify-between items-center px-4 py-2 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="w-30 h-15"
          /> 
          <div className="flex space-x-4 ml-4">
            {navIcons.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-2 hover:bg-gray-200 rounded-full cursor-pointer transition">
                <div className="text-xl">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center bg-gray-200 rounded-full px-3 py-2 flex-1 mx-4 max-w-xl">
          <img
            src="https://img.icons8.com/ios-filled/20/000000/search.png"
            alt="Search"
            className="w-5 h-5 mr-2"
          />
          <input
            type="text"
            placeholder="Start typing to search..."
            className="bg-transparent outline-none flex-1"
          />
        </div>

        <div className="flex space-x-3">
          {actionIcons.map((icon, index) => (
            <div key={index} className="p-2 rounded-full hover:bg-gray-200 cursor-pointer transition">
              <div className="text-xl">{icon.icon}</div>
            </div>
          ))}
        </div>
      </div>
 
      <div className="flex flex-1 overflow-hidden"> 
        <div className="w-64 bg-white shadow-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 shadow-md py-1 px-4">
              <div className="text-lg flex gap-4 font-semibold">
                <span>👤</span> Lzycrazy
              </div>
            </div>
            <div className="flex items-center space-x-2 shadow-md py-1 px-4">
              <div className="text-lg">📝 My Ads</div>
            </div>
            <div className="flex items-center space-x-2 shadow-md py-1 px-4">
              <div className="text-lg">📦 My Order</div>
            </div>
            <div className="flex items-center space-x-2 shadow-md py-1 px-4">
              <div className="text-lg">🛒 Market</div>
            </div>
            <div className="flex items-center space-x-2 shadow-md py-1 px-4">
              <div className="text-lg">👥 My Group</div>
            </div>
            <div className="flex items-center space-x-2 shadow-md py-1 px-4">
              <div className="text-lg">🎬 Movies</div>
            </div>
            <div className="flex items-center space-x-2 shadow-md py-1 px-4">
              <div className="text-lg">⭐ Saved</div>
            </div>
          </div>
        </div>
 
        <div className="flex-1 flex flex-col p-4 overflow-y-auto">
          <Stories/>
          <div className="bg-white rounded-lg p-4 shadow mb-4">
            <div className="flex items-start space-x-3">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <textarea
                placeholder="What's going on? #Hashtag.. @Mention.. Link.."
                className="flex-1 border border-gray-300 rounded-full p-3 resize-none focus:outline-none"
                rows={4}
              ></textarea>
            </div>
            <div className="flex justify-end space-x-3 mt-2">
              <button className=" px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm">
                Photo/Video
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition text-sm">
                Post
              </button>
            </div>
          </div>

          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex items-center mb-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="User"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold">{post.user}</div>
                  <div className="text-xs text-gray-500">{post.time}</div>
                </div>
                <div className="ml-auto cursor-pointer">...</div>
              </div>
              <div className="mb-2">{post.content}</div>
              {post.image && (
                <img src={post.image} alt="Post" className="w-full rounded-lg mb-2" />
              )}
              <div className="flex justify-around text-sm text-gray-600 mt-2">
                <div className="flex items-center space-x-1 cursor-pointer">👍 {post.likes}</div>
                <div className="flex items-center space-x-1 cursor-pointer">💬 {post.comments}</div>
                <div className="flex items-center space-x-1 cursor-pointer">🔗 {post.share}</div>
              </div>
            </div>
          ))}
        </div>
 
        <div className="w-72 bg-white rounded-lg p-4 shadow overflow-y-auto hidden lg:block">
          <div>
            <div className="flex justify-between mb-2 items-center">
              <h3 className="font-semibold">People you may know</h3>
              <a href="#" className="text-blue-500 text-sm">See all</a>
            </div>
            {people.map((p, i) => (
              <div key={i} className="flex items-center mb-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold">{p.name}</div>
                  <button
                    className={`mt-1 px-3 py-1 rounded-full text-sm font-medium border ${
                      p.follow
                        ? 'bg-white text-black border-gray-300'
                        : 'bg-blue-600 text-white border-gray-300'
                    } hover:bg-gray-100 transition`}
                  >
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Invite Your Friends</h3>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm">
              Send
            </button>
          </div>

          <div className="mt-6 text-gray-500 text-xs">
            <div>© 2022 Izycrazy</div>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Blog</a>
              <a href="#" className="hover:underline">Contact Us</a>
              <a href="#" className="hover:underline">More</a>
            </div>
            <div className="mt-2">Languages</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
