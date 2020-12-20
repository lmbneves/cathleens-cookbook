<template>
  <v-container class="pa-16">
    <div class="recipe-composer">
      <h1>Add a recipe</h1>
      <v-form 
        v-model="valid"
        ref="add-recipe-form" >
        <v-container>
          <v-row>
            <v-col
              cols="12">
              <v-text-field
                v-model="title"
                label="Title"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="4">
              <v-text-field
                v-model="prep_time"
                label="Prep time"
                prepend-inner-icon="mdi-alarm-check"
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              cols="4">
              <v-text-field
                v-model="cook_time"
                label="Cook time"
                prepend-inner-icon="mdi-pot-steam"
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              cols="4">
              <v-text-field
                v-model="num_servings"
                label="# of servings"
                prepend-inner-icon="mdi-account-multiple"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row>
            <v-col
              cols="12">
              <v-textarea
                v-model="description"
                label="Recipe description"
                outlined>
              </v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <!-- ingredients -->
        <v-container>
          <v-row>
            <v-col
              cols="12">
              <tiptap-vuetify
                v-model="ingredients"
                :extensions="ing_extensions"
                :toolbar-attributes="{ color: 'yellow' }"
                placeholder="List the ingredients your recipe needs..."
                />
            </v-col>
          </v-row>
        </v-container>

        <!-- directions -->
        <v-container>
          <v-row>
            <v-col
              cols="12">
              <tiptap-vuetify
                v-model="directions"
                :extensions="dir_extensions"
                :toolbar-attributes="{ color: 'blue' }"
                placeholder="Provide recipe instructions..."
                />
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

  export default {
    name: 'RecipeComposer',
    components: { TiptapVuetify },
    data: function () {
      return {
        ing_extensions: [
          History,
          Bold,
          Italic,
          Underline,
          Strike,
          ListItem,
          BulletList,
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
        dir_extensions: [
          History,
          Bold,
          Italic,
          Underline,
          Strike,
          ListItem,
          BulletList,
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
        prep_time: "",
        cook_time: "",
        servings: "",
        description: "",
        ingredients: "",
        directions: ""
      }
    },
    methods: {
      postCharacter: function () {
        axios
          .post('http://localhost:3000/recipes', {
            title: this.title,
            prep_time: this.prep_time,
            cook_time: this.cook_time,
            servings: this.servings,
            description: this.description,
            ingredients: this.ingredients,
            directions: this.directions
          });
      }
    }
  }
</script>

<style scoped>
.tiptap-vuetify-editor {
  width: 100%;
}

.tiptap-vuetify-editor >>> .tiptap-vuetify-editor__content {
	min-height: 120px;
}

.tiptap-vuetify-editor >>> .ProseMirror {
	min-height: 100px;
}
</style>