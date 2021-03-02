<template>
  <section class="content">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title">Product List</h6>
                <div class="text-right">
                    <router-link to="/addProduct" class="btn btn-sm btn-primary"> Add </router-link>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table class="table table-bordered">
                  <thead>                  
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Image</th>
                      <th>Title</th>
                       <th>Description</th>
                       <th>Image</th>
                      <th>Action</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for = "(contentList,index) in content" :key = "contentList.id">
                      <td>{{index+1}}</td>
                      <td><img :src="postImage(contentList.image)" alt="" width="50" height="50"></td>
                      <td>{{contentList.title}}</td>
                      <td>{{contentList.description }}</td>
                       <td>{{contentList.price}}</td>
                      <td class="text-center">
                         <div class="btn-group btn-group-sm">
                           
                             <router-link :to="`/editProduct/${contentList.id}`" class="btn btn-xs btn-info"><font-awesome-icon :icon="['fas', 'edit']" /></router-link>
                             <a  @click.prevent ="productDelete(contentList.id)" class="pointer btn btn-xs btn-danger"><font-awesome-icon :icon="['fas', 'trash']" /></a>
                         </div>
                      </td>
                     
                    </tr>
                   
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
             
            </div>
            <!-- /.card -->

            
          </div>
           </div>
          <!-- /.col -->
    
      </div><!--/. container-fluid -->
    </section>
</template>

<script>
import UserService from '../../services/user.service';
import authHeader from '../../services/auth-header';

import axios from 'axios';
export default {
  name: 'List',
  data() {
    return {
      content: '',
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      response => {
        this.content = response.data.productList;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    productDelete(id){
      axios.delete(api_url+'products/'+id,{ headers: authHeader() }).then(()=>{
        Toast.fire({
                icon: 'success',
                title: 'Product Deleted successfully'
              })
        UserService.getUserBoard().then(
        response => {
          this.content = response.data.productList;
        },
      
    );
    })
    },
    postImage($img){
      return file_url+$img;
    }
  }
};
</script>
<style scoped>
	.content{
		margin-top:3%;
	}
  .card-header{
    max-height: 50px;
  }
  .card-body{
    padding: 1rem;
  }
  .text-right{
    margin-top:-3%;
  }
  .pointer{
    cursor: pointer;
  }

</style>