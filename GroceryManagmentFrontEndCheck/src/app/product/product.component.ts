import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '../Service/sidebar.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CategorypassService } from '../Service/categorypass.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService, productInfo } from '../Service/product.service';


declare var $;

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


    // for jquert datatable

    // @ViewChild('dataTable', { static: true }) table;
    // dataTable : any;
    // dtOptions : any;


    constructor(
        // private sidebarData: SidebarService,
        private categoryPass: CategorypassService,
        private route: ActivatedRoute,
        private productDetail: ProductService
    ) {

        this.productDetailInitCall();

        // setTimeout(function () {
        //     $(function () {
        //         $('#tableData').DataTable();
        //     });
        // }, 3000);


    }




    products: productInfo[];

    //console.log(checkCategoryProduct.categoryName)
    product : productInfo;
    categoryName: String;
    allCategory: boolean;
    CategoryId : number ;
    ngOnInit() {
        this.allCategory = true;
        this.categoryInitCall();
        this.productDetailInitCall();

        // this.dataTable = $(this.table.nativeElement);
        // this.dataTable.DataTable(this.dtOptions);
    }




    categoryInitCall() {

        this.route.params.subscribe(params => {
            this.categoryName = this.categoryPass.getCategoryName();
            this.CategoryId = +params['id'];
            if (this.categoryName == null) {
                this.allCategory == true;

            } else {

                this.allCategory = false;
            }
        });


        // this.sidebarData.allCategoryProductsBackend().subscribe(
        //     response => console.log(response)
        // )

    }

    productDetailInitCall() {

        if (this.categoryName != null) {
           
            this.productDetail.getProductByIdBackend(this.CategoryId).subscribe(
                response => this.handleSuccessfullResponse(response)
            )
        } else {
            console.log("mistake");
            this.productDetail.getallProductsFromBackend().subscribe(
                response => this.handleSuccessfullResponse(response)
            )
        }

    }

    handleSuccessfullResponse(response) {
       if(this.categoryName != null)    {
           this.products = response;
           console.log(this.products)
       }    else{
           
            this.products = response;
       }
        
       
    }
}



