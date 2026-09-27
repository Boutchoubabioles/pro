import AdminInstallButton from './AdminInstallButton';
import AdminEnhancements from './AdminEnhancements';
import AdminStatsTab from './AdminStatsTab';
import ProductUiSafe from './ProductUiSafe';

export const metadata={
  title:'Administration · BoutchouBabioles',
  manifest:'/manifest.webmanifest'
};

export default function AdminLayout({children}){
  return <><AdminStatsTab/><ProductUiSafe/>{children}<AdminEnhancements/><AdminInstallButton/></>;
}
