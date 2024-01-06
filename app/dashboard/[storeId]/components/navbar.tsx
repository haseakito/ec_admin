import {
  useAuth,
  UserButton
} from '@clerk/nextjs'
import { NavigationMenu } from './nav-items'
import { StoreSwitcher } from './store-switcher'
import { fetchStores } from '@/services/store'

export async function Navbar() {

  const { userId } = useAuth()

  const stores = await fetchStores()
  
  return (
    <div className='border-b-[1px]'>
        <div className='flex h-16 items-center px-4'>
            <StoreSwitcher
              stores={stores}
            />            
            <NavigationMenu />            
            <div className='ml-auto flex items-center space-x-3'>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    </div>
  )
}
