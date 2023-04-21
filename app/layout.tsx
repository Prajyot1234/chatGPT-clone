import "./globals.css";
import { OPEN_GRAPH } from "@/constants/seo";

// nextAuth custom SessionProvider
import { SessionProvider } from '../components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../pages/api/auth/[...nextauth]';

// theme provider
import { ThemeProviders } from './themeProviders';
import Login from '@/components/Login';
import NavbarMobile from '@/components/NavbarMobile';

import Sidebar from '@/components/Sidebar';
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
  title: 'ChatGPT Clone',
  description: 'clone of ChatGPT.',
  openGraph: OPEN_GRAPH,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const session = await getServerSession(authOptions);
    
  return (
    <html lang="en">
      <body className='transition-colors duration-300'>
        <SessionProvider session={session}>
          <ThemeProviders>
            {
              !session ? <Login /> : 
                (
                  <div>
                    <div>
                      <NavbarMobile />
                    </div>
                    <div className='flex'>
                      {/* sidebar */}
                      <div className='hidden lg:block lg:flex-[0.19]'>
                        <Sidebar />
                      </div>
                      
                      {/* client notifications. */}
                      <ClientProvider />

                      <div className='flex-1 lg:flex-[0.81]'>
                        {children}  
                      </div>
                    </div>
                  </div>
                )
            }
          </ThemeProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
