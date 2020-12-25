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
        @submit.prevent="submitRecipe"
        ref="add-recipe-form">
        <v-container>
          <v-row>
            <v-col
              cols="12">
              <v-text-field
                v-model="title"
                label="Title"
                :error-messages="titleErrors"
                required
                @input="$v.title.$touch()"
                @blur="$v.title.$touch()"
                outlined></v-text-field>
              <v-textarea
                v-model="description"
                label="Description"
                :error-messages="descErrors"
                required
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
                class="recipe-description__input"
                outlined></v-textarea>
              <v-text-field
                v-model="recipe_url"
                label="Recipe URL"
                :error-messages="recipeErrors"
                required
                @input="$v.recipe_url.$touch()"
                @blur="$v.recipe_url.$touch()"
                outlined></v-text-field>
              <v-text-field
                v-model="img_url"
                label="Image URL"
                :error-messages="imgErrors"
                required
                @input="$v.img_url.$touch()"
                @blur="$v.img_url.$touch()"
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
                :disabled="submitStatus === 'PENDING'">
                Add Recipe Link
              </v-btn>
              <p class="pt-4 submit-status__ok" v-if="submitStatus === 'OK'">Your recipe has been added!</p>
              <p class="pt-4 submit-status__fail" v-if="submitStatus === 'ERROR'">Please review your recipe for errors.</p>
              <p class="pt-4 submit-status__pending" v-if="submitStatus === 'PENDING'">Sending recipe...</p>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import { required, minLength, url } from 'vuelidate/lib/validators'
  import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, History } from 'tiptap-vuetify'
  import tag_map from '../assets/json/tags.json'

  export default {
    name: 'RecipeLinker',
    components: { TiptapVuetify },
    data: function () {
      return {
        submitStatus: null,
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
    mixins: [validationMixin],
    validations: {
      title: { required, minLength: minLength(5) },
      description: { required },
      img_url: { required, url },
      recipe_url: { required, url },
      prep_time: { required },
      cook_time: { required },
      servings: { required }
    },
    computed: {
      titleErrors() {
        const errors = [];
        if (!this.$v.title.$dirty) return errors;
        !this.$v.title.minLength && errors.push('Title must be at least 5 characters long');
        !this.$v.title.required && errors.push('Title is required');
        return errors;
      },
      descErrors() {
        const errors = [];
        if (!this.$v.description.$dirty) return errors;
        !this.$v.description.required && errors.push('Description is required');
        return errors;
      },
      imgErrors() {
        const errors = [];
        if (!this.$v.img_url.$dirty) return errors;
        !this.$v.img_url.required && errors.push('Image URL is required');
        !this.$v.img_url.url && errors.push('Image URL must be a valid URL');
        return errors;
      },
      recipeErrors() {
        const errors = [];
        if (!this.$v.recipe_url.$dirty) return errors;
        !this.$v.recipe_url.required && errors.push('Recipe URL is required');
        !this.$v.recipe_url.url && errors.push('Recipe URL must be a valid URL');
        return errors;
      }
    },
    methods: {
      remove (item) {
        const index = this.tags.indexOf(item.name)
        if (index >= 0) this.tags.splice(index, 1)
      },
      submitRecipe() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
        } else {
          this.postRecipe();
          this.submitStatus = 'PENDING';
          setTimeout(() => {
            this.submitStatus = 'OK';
          }, 500);
        }
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
          }).then(() => {
            this.$router.push({ name: "Home" });
            location.reload();
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

.submit-status__fail {
  color: red;
}
</style>