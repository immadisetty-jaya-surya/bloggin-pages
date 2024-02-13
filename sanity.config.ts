import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/sanity/schemas'
import StudioNavbar from '@/components/StudioNavbar'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!/*  || 'production'  */;

export default defineConfig({
  basePath:'/studio',
  name: 'Blogs_app',
  title: 'blogss-app',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio:{
    components:{
      navbar: StudioNavbar,
    }
  }
})
