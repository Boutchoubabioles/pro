import AdminInstallButton from './AdminInstallButton';
import AdminEnhancements from './AdminEnhancements';
import AdminStatsTab from './AdminStatsTab';

export const metadata={
  title:'Administration · BoutchouBabioles',
  manifest:'/manifest.webmanifest'
};

export default function AdminLayout({children}){
  return <><AdminStatsTab/>{children}<AdminEnhancements/><AdminInstallButton/></>;
}
