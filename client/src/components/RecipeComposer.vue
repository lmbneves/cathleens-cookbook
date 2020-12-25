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
        @submit.prevent="submitRecipe"
        ref="add-recipe-form">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              md="8">
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
                v-model="img_url"
                label="Image URL"
                :error-messages="imgErrors"
                required
                @input="$v.img_url.$touch()"
                @blur="$v.img_url.$touch()"
                outlined></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4">
              <div class="pt-6 pb-2 pl-6 pr-6 recipe-stats">
                <v-text-field
                  v-model="prep_time"
                  label="Prep time"
                  prepend-inner-icon="mdi-alarm-check"
                  class="recipe-stats__input"
                  hint="e.g., 1 hour and 15 minutes"
                  :error-messages="prepErrors"
                  required
                  @input="$v.prep_time.$touch()"
                  @blur="$v.prep_time.$touch()"
                  outlined></v-text-field>
                <v-text-field
                  v-model="cook_time"
                  label="Cook time"
                  prepend-inner-icon="mdi-pot-steam"
                  class="recipe-stats__input"
                  hint="e.g., 1 hour and 15 minutes"
                  :error-messages="cookErrors"
                  required
                  @input="$v.cook_time.$touch()"
                  @blur="$v.cook_time.$touch()"
                  outlined></v-text-field>
                <v-text-field
                  v-model="servings"
                  label="How many served?"
                  prepend-inner-icon="mdi-account-multiple"
                  class="recipe-stats__input"
                  hint="e.g., 4 people"
                  :error-messages="servingsErrors"
                  required
                  @input="$v.servings.$touch()"
                  @blur="$v.servings.$touch()"
                  outlined></v-text-field>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4">
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
              cols="12"
              md="8">
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
                :disabled="submitStatus === 'PENDING'">
                Add Recipe
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
    name: 'RecipeComposer',
    components: { TiptapVuetify },
    data: function () {
      return {
        submitStatus: null,
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
    mixins: [validationMixin],
    validations: {
      title: { required, minLength: minLength(5) },
      description: { required },
      img_url: { required, url },
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
      prepErrors() {
        const errors = [];
        if (!this.$v.prep_time.$dirty) return errors;
        !this.$v.prep_time.required && errors.push('Prep time is required');
        return errors;
      },
      cookErrors() {
        const errors = [];
        if (!this.$v.cook_time.$dirty) return errors;
        !this.$v.cook_time.required && errors.push('Cook time is required');
        return errors;
      },
      servingsErrors() {
        const errors = [];
        if (!this.$v.servings.$dirty) return errors;
        !this.$v.servings.required && errors.push('Servings is required');
        return errors;
      }
    },
    methods: {
      remove (item) {
        const index = this.tags.indexOf(item.name);
        if (index >= 0) this.tags.splice(index, 1);
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

.submit-status__ok, .submit-status__pending {
  
}

.submit-status__fail {
  color: red;
}
</style>