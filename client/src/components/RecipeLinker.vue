<template>
  <v-container class="pl-16 pr-16 pt-10">
    <div class="recipe-linker">
      <v-row>
        <v-col
          cols="12"
          align="center">  
          <h1 class="pb-10">Link a recipe</h1>
        </v-col>
      </v-row>
      <v-form 
        ref="add-recipe-form">
        <v-container>
          <v-row>
            <v-col
              cols="12">
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
                v-model="recipe_url"
                label="Recipe URL"
                outlined></v-text-field>
              <v-text-field
                v-model="img_url"
                label="Image URL"
                outlined></v-text-field>
              <tiptap-vuetify
                  v-model="notes"
                  :extensions="notes_extensions"
                  :toolbar-attributes="{ color: '#BBBAD0' }"
                  :card-props="{ outlined: true }"
                  placeholder="Leave some notes of your own!"
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
                Add Recipe Link
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
    name: 'RecipeLinker',
    components: { TiptapVuetify },
    data: function () {
      return {
        notes_extensions: [
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
        add_method: "",
        description: "",
        recipe_url: "",
        img_url: "",
        notes: "",
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
            add_method: "link",
            description: this.description,
            recipe_url: this.recipe_url,
            img_url: this.img_url,
            notes: this.notes,
            tags: this.tags
          });
      }
    }
  }
</script>

<style scoped>
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
</style>