
// starter kit
import UserManagement from '../component/dashboard/user_management'
import ChannelManagement from '../component/dashboard/channel_management'
import VideoManagement from '../component/dashboard/video_management'
import Parametre from '../component/dashboard/parametre'

export const routes = [
    { path:"/dashboard/user_management", Component: UserManagement },    
    { path:"/dashboard/channel_management", Component: ChannelManagement }, 
    { path:"/dashboard/video_management", Component: VideoManagement },    
    { path:"/dashboard/parametre", Component: Parametre },
]