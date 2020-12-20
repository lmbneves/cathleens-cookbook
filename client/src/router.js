import RecipeComposer from './components/RecipeComposer'
import RecipeDetail from './components/RecipeDetail'
import RecipeList from './components/RecipeList'

export const routes = [
  { path: '/' , component: RecipeList },
  { path: '/add-recipe' , component: RecipeComposer },
  { path: '/recipes/:id', component: RecipeDetail }
]