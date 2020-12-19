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
                label="Prep time"
                prepend-inner-icon="mdi-alarm-check"
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              cols="4">
              <v-text-field
                label="Cook time"
                prepend-inner-icon="mdi-pot-steam"
                outlined
              ></v-text-field>
            </v-col>
            <v-col
              cols="4">
              <v-text-field
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
              <tiptap-vuetify
                v-model="content"
                :extensions="extensions"
                :toolbar-attributes="{ color: 'yellow' }"
                placeholder="Write about your recipe..."
                />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>
  import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, History } from 'tiptap-vuetify'

  export default {
    name: 'RecipeComposer',
    components: { TiptapVuetify },
    data: () => ({
      extensions: [
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
      content: ""
    })
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