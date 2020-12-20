import RecipeComposer from './components/RecipeComposer'
import RecipeList from './components/RecipeList'

export const routes = [
  { path: '/' , component: RecipeList },
  { path: '/add-recipe' , component: RecipeComposer }
]