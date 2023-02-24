<!-- eslint-disable vue/valid-template-root -->
<template>
    <div>
      <h2>Enregistrement de produit</h2>
<form @submit.prevent="save">
    <div class="form-group">
    <label>id</label>
    <input type="text" v-model="produit.id" class="form-control"  placeholder="id">
  </div>
  <div class="form-group">
    <label>nom</label>
    <input type="text" v-model="produit.nom" class="form-control"  placeholder="nom">
  </div>
  <div class="form-group">
    <label>prix</label>
    <input type="text" v-model="produit.prix" class="form-control"  placeholder="prix">
  </div>
  <div class="form-group">
    <label>description</label>
    <input type="text" v-model="produit.description" class="form-control"  placeholder="description">
  </div>
  <button type="submit" class="btn btn-primary">Save</button>
</form>
      <h2>produit View</h2>
      <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nom</th>
      <th scope="col">Prix</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="produit in result" v-bind:key="produit.id">
          <td>{{ produit.id }}</td>
          <td>{{ produit.nom }}</td>
          <td>{{ produit.prix }}</td>
          <td>{{ produit.description }}</td>
          <td>
            <button type="button" class="btn btn-warning" @click="edit(produit)">Edit</button>
            <button type="button" class="btn btn-danger"  @click="remove(produit)">Delete</button>
          </td>
        </tr>
    </tbody>
</table> </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)
export default {
  name: 'ProduitCrud',
  data () {
    return {
      result: {},

      produit: {
        _id: '',
        nom: '',
        prix: '',
        description: ''
      }
    }
  },
  created () {
    this.produitreLoad()
  },
  mounted () {
    console.log('mounted() called.......')
  },
  methods: {
    produitreLoad () {
      var page = 'http://localhost:8080/getAllProduit'
      axios.get(page)
        .then(
          ({data}) => {
            console.log(data)
            this.result = data
          }
        )
    },

    save () {
      this.saveData()
    },
    saveData () {
      axios.post('http://localhost:8080/addProduit', this.produit)
        .then(
          ({data}) => {
            alert('enregistre')
            this.produit.id = ''
            this.produit.nom = ''
            this.produit.prix = ''
            this.produit.description = ''
            this.produitreLoad()
          }
        )
    },
    edit (produit) {
      this.produit = produit
    },
    updateData (produit) {
      var editrecords = `http://localhost:8080/editProduit/${produit.id}`
      axios.put(editrecords, this.produit)
        .then(
          ({data}) => {
            this.produit.id = ''
            this.produit.nom = ''
            this.produit.prix = ''
            this.produit.description = ''
            this.id = ''
            alert('mis a jour')
            this.produitreLoad()
          }
        )
    },
    remove (produit) {
      var url = `http://localhost:8080/deleteProduit/${produit.produitid}`
      axios.delete(url)
      alert('supprime')
      this.produitreLoad()
    }
  }
}
</script>
