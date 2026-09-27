import AdminInstallButton from './AdminInstallButton';
import AdminEnhancements from './AdminEnhancements';
export const metadata={title:'Administration · BoutchouBabioles',manifest:'/manifest.webmanifest'};
export default function AdminLayout({children}){return <>{children}<AdminEnhancements/><AdminInstallButton/></>;}
