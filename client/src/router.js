import RecipeComposer from './components/RecipeComposer'
import RecipeDetail from './components/RecipeDetail'
import RecipeLinker from './components/RecipeLinker'
import RecipeList from './components/RecipeList'

export const routes = [
  { path: '/', component: RecipeList },
  { path: '/new-recipe-hand', name: 'NewRecipeHand', component: RecipeComposer },
  { path: '/new-recipe-link', name: 'NewRecipeLink', component: RecipeLinker },
  { path: '/recipes/:id', component: RecipeDetail }
]