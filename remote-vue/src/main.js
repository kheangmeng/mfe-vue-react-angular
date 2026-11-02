// Standalone entry for developing the remote on its own at :8082
import { mount } from './mount.js'
mount(document.getElementById('app'), { user: 'standalone-dev' })
