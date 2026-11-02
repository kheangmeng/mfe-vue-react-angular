// Standalone entry: develop the remote on its own at :8083
import { mount } from './mount'
mount(document.getElementById('app')!, { user: 'standalone-dev' })
