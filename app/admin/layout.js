import AdminInstallButton from './AdminInstallButton';

export const metadata={
  title:'Administration · BoutchouBabioles',
  manifest:'/manifest.webmanifest'
};

export default function AdminLayout({children}){
  return <>{children}<AdminInstallButton/></>;
}
