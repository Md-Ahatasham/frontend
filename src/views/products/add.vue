<template>
 <section class="content">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <!-- general form elements -->
            <div class="card card-primary">
              <div class="card-header">
                <h6 class="card-title">Add New Product</h6>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form role="form" @submit.prevent = 'productSave' enctype="multipart/form-data">
                <div class="card-body">
                    <div class="row">
                        <div class="col-7 right-border">
                            
                             <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                      <label for="exampleInputEmail1">Product Title</label>
                                      <input type="text" class="form-control" id="title" v-model = "form.title" name = "title" placeholder="Enter Title" :class="{ 'is-invalid': form.errors.has('title') }">
                                      <has-error :form="form" field="title"></has-error>
                                    </div>
                               </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                      <label for="exampleInputEmail1">Product Price</label>
                                      <input type="text" class="form-control" id="price" v-model = "form.price" name = "price" placeholder="Enter Price" :class="{ 'is-invalid': form.errors.has('price') }">
                                      <has-error :form="form" field="price"></has-error>
                                    </div>
                               </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12">
                                    

                                    <div class="form-group">
                                    <label for="exampleInputEmail1">Description</label>
                                     <ckeditor :editor="editor"  v-model="form.description" name="description" id="description"  :config="editorConfig" :class="{ 'is-invalid': form.errors.has('description') }" ></ckeditor> 
                                        <has-error :form="form" field="description"></has-error>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="col-md-5">

                             <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputFile">File input</label>
                                        
                                        
                                            <input @change = "changePhoto($event)" type="file" class="form-control"   name = "file"  :class="{ 'is-invalid': form.errors.has('image') }">
                                            <img :src="form.photo" alt="" height="80" width="80" >
                                            <has-error :form="form" field="image"></has-error>
                                      
                                    </div>

                                    
                                </div>

                            </div>

                           

                             <div class="row">
                                <div class="col-md-12">
                                   <div class="card-footer text-center">
                                    <button type="submit" class="btn btn-sm btn-primary">Submit</button>
                                    <button type="submit" @click="goBack" class="btn btn-sm btn-danger">Back</button>
                                    </div>
                                </div>

                            </div>
                            
                            
                        </div>
                    </div>
                  
                </div>
                <!-- /.card-body -->

               
              </form>
            </div>
          
          </div>
           </div>
          <!-- /.col -->
    
      </div><!--/. container-fluid -->
    </section>
    <!-- /.content -->
</template>

<script>
// import UserService from '../services/user.service';
import CKEditor from 'ckeditor4-vue/dist/legacy.js';
import authHeader from '../../services/auth-header'
export default {
  name: 'Save',
  data() {
    return {
      editor: CKEditor,
      editorConfig: {

       },
      content: '',
      form: new Form({
				title: '',
			  description:'',
		    photo:'',
				price:'',
      })
      
    };
  },
  mounted() {
  },
  methods: {
    changePhoto($event){
       var vm = this;
		  	var file = event.target.files[0];
        if(file.size>2097152){
					 Swal.fire({
					  icon: 'error',
					  title: 'Oops...',
					  text: 'File Size should not be larger than 2MB!'
					  
					})
		  	}else{
          var reader = new FileReader();
            reader.onload = event => {
            vm.form.photo = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    },
    productSave() {
      var vm = this;
      // Submit the form via a POST request
       vm.form.post(api_url+'products',{ headers: authHeader() })
		        .then((response) => {
            
            if(response.data.status == 'success'){
              Toast.fire({
                icon: 'success',
                title: 'Data Added successfully'
              })
              this.$router.push('/productList');
            }else{
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something Went Wrong'             
            })
            }
              
             }).catch(()=>{

		    })
    },
    goBack(){
      this.$router.push('/productList');
    },

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


</style>
