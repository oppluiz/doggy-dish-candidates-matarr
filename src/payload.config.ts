import { postgresAdapter } from '@payloadcms/db-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Workshops } from './collections/Workshops'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { Authors } from './collections/Authors'
import { Food } from './collections/Food'
import { Recipes } from './collections/Recipes'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { HowTo } from './collections/HowTo'
import { Health } from './collections/Health'
import { SubHubs } from './collections/SubHubs'
import { Hubs } from './collections/Hubs'
import { Popup } from './Popup/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    group: {
      'Content Collections': {
        collections: ['recipes', 'food', 'health', 'howTo', 'hubs'],
      },
      'Site Management': {
        collections: ['pages', 'posts', 'workshops'],
      },
      'Media & Taxonomy': {
        collections: ['media', 'categories', 'authors', 'subHubs'],
      },
      'User Management': {
        collections: ['users'],
      },
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 900,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    defaultDepth: 4,
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  collections: [
    Pages,
    Posts,
    Workshops,
    Media,
    Categories,
    Users,
    Authors,
    Food,
    Recipes,
    HowTo,
    Health,
    SubHubs,
    Hubs,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, Popup],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  onInit: async (payload) => {
    try {
      // Only initialize defaults if the popup global is missing.
      const existing = await payload.findGlobal({ slug: 'popup', overrideAccess: true })
      if (!existing) {
        await payload.updateGlobal({
          slug: 'popup',
          overrideAccess: true,
          data: {
            enabled: false,
            dismissible: true,
            title: '',
            plans: [],
          },
        })
        payload.logger.info('Initialized popup global with defaults')
      }
    } catch (e) {
      // If findGlobal fails before tables are created, create once then stop overwriting
      try {
        await payload.updateGlobal({
          slug: 'popup',
          overrideAccess: true,
          data: {
            enabled: false,
            dismissible: true,
            title: '',
            plans: [],
          },
        })
        payload.logger.info('Initialized popup global with defaults (fallback)')
      } catch (err) {
        payload.logger.warn('Could not initialize popup global', err as Error)
      }
    }
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true
        return false
      },
    },
  },
})
