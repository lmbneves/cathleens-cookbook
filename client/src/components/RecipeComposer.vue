<template>
  <v-container class="pl-16 pr-16 pt-10">
    <div class="recipe-composer">
      <v-row>
        <v-col
          cols="12"
          align="center">  
          <h1 class="pb-10">Add a recipe</h1>
        </v-col>
      </v-row>
      <v-form 
        ref="add-recipe-form">
        <v-container>
          <v-row>
            <v-col
              cols="8">
              <v-text-field
                v-model="title"
                label="Title"
                outlined></v-text-field>
              <v-textarea
                v-model="description"
                label="Description"
                class="recipe-description__input"
                outlined></v-textarea>
              <v-text-field
                v-model="img_url"
                label="Image URL"
                outlined></v-text-field>
            </v-col>
            <v-col
              cols="4">
              <div class="pt-6 pb-2 pl-6 pr-6 recipe-stats">
                <v-text-field
                  v-model="prep_time"
                  label="Prep time"
                  prepend-inner-icon="mdi-alarm-check"
                  class="recipe-stats__input"
                  outlined></v-text-field>
                <v-text-field
                  v-model="cook_time"
                  label="Cook time"
                  prepend-inner-icon="mdi-pot-steam"
                  class="recipe-stats__input"
                  outlined></v-text-field>
                <v-text-field
                  v-model="servings"
                  label="How many served?"
                  prepend-inner-icon="mdi-account-multiple"
                  class="recipe-stats__input"
                  outlined></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="4">
              <h2 class="pb-4">Ingredients</h2>
              <tiptap-vuetify
                  v-model="ingredients"
                  :extensions="ing_extensions"
                  :card-props="{ outlined: true }"
                  :toolbar-attributes="{ color: '#BBBAD0' }"
                  placeholder="List recipe ingredients..."
                  />
            </v-col>
            <v-col
              cols="8">
              <h2 class="pb-4">Directions</h2>
              <tiptap-vuetify
                  v-model="directions"
                  :extensions="dir_extensions"
                  :toolbar-attributes="{ color: '#BBBAD0' }"
                  :card-props="{ outlined: true }"
                  placeholder="Provide recipe instructions..."
                  />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12">
              <v-autocomplete
                v-model="tags"
                :items="tag_list"
                chips
                clearable
                deletable-chips
                multiple
                label="Tags"
                item-text="name"
                item-value="name">
                <!-- tag chip -->
                <template v-slot:selection="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    outlined
                    :color="data.item.color"
                    @click="data.select"
                    @click:close="remove(data.item)">
                    <v-icon left x-small class="tag-chip__icon">
                      {{ data.item.icon }}</v-icon>
                    {{ data.item.name }}
                  </v-chip>
                </template>

                <!-- tag list -->
                <template v-slot:item="data">
                  <v-icon 
                    left 
                    x-small 
                    :color="data.item.color"
                    class="tag-list__icon">{{ data.item.icon }}</v-icon>
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>

              </v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col
              cols="12"
              align="right">
              <v-btn
                dark
                large
                color="#2D3040"
                type="submit"
                v-on:click="postRecipe">
                Add Recipe
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, History } from 'tiptap-vuetify'
  import tag_map from '../assets/json/tags.json'

  export default {
    name: 'RecipeComposer',
    components: { TiptapVuetify },
    data: function () {
      return {
        ing_extensions: [
          History,
          Bold,
          Italic,
          ListItem,
          BulletList,
          Link,
          HardBreak
        ],
        dir_extensions: [
          History,
          Bold,
          Italic,
          Underline,
          Strike,
          ListItem,
          OrderedList,
          [Heading, {
            options: {
              levels: [1, 2, 3]
            }
          }],
          Blockquote,
          Link,
          HardBreak
        ],
        title: "",
        add_method: "",
        prep_time: "",
        cook_time: "",
        servings: "",
        description: "",
        ingredients: "",
        directions: "",
        img_url: "",
        tags: [],
        tag_list: tag_map["tags"]
      }
    },
    methods: {
      remove (item) {
        const index = this.tags.indexOf(item.name)
        if (index >= 0) this.tags.splice(index, 1)
      },
      postRecipe: function () {
        axios
          .post('https://protected-bastion-86315.herokuapp.com/recipes', {
            title: this.title,
            add_method: "hand",
            prep_time: this.prep_time,
            cook_time: this.cook_time,
            servings: this.servings,
            description: this.description,
            ingredients: this.ingredients,
            directions: this.directions,
            img_url: this.img_url,
            tags: this.tags
          }).then(() => {
            this.$router.push({ name: "Home" });
            location.reload();
          });
      }
    }
  }
</script>

<style scoped>
.recipe-stats {
  background-color: #BBBAD0;
  border-radius: 2px;
}

.recipe-stats__input >>> div.v-input__slot {
  background-color: white;
}

.recipe-description__input >>> textarea {
  max-height: 109px;
}

.tiptap-vuetify-editor {
  width: 100%;
}

.tiptap-vuetify-editor >>> .tiptap-vuetify-editor__content {
	min-height: 160px;
}

.tiptap-vuetify-editor >>> .ProseMirror {
	min-height: 160px;
}

.tag-chip__icon {
  font-size: 18px !important;
  margin-left: 0px !important;
}

.tag-list__icon {
  font-size: 18px !important;
}
</style>