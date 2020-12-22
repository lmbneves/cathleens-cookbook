import RecipeComposer from './components/RecipeComposer'
import RecipeDetail from './components/RecipeDetail'
import RecipeLinker from './components/RecipeLinker'
import RecipeList from './components/RecipeList'

export const routes = [
  { path: '/' , component: RecipeList },
  { path: '/add-recipe-by-hand' , component: RecipeComposer },
  { path: '/add-recipe-by-link' , component: RecipeLinker },
  { path: '/recipes/:id', component: RecipeDetail }
]