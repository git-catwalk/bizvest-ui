import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ActivatedRoute, Router} from "@angular/router";
import {ItemService} from "../services/item.service";
import {Item} from "../services/app-model";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  item:Item;
  form:FormGroup;

  constructor(private fb: FormBuilder,private service:ItemService,private router: Router,private route: ActivatedRoute) {
    this.item = this.emptyItem();
    this.form = this.createForm();
  }

  ngOnInit(): void {
     let id = this.route.snapshot.paramMap.get('id');
     if(id){
         this.service.getById(id).subscribe(i=>{
             this.item = i;
             this.form = this.createForm();
         });
     }
  }

  public save() {
    this.service.save(Object.assign({}, this.item,this.form.getRawValue())).subscribe(()=>{
        this.back();
    });
  }

  public back(){
     this.router.navigate(['/items']).then();
  }

  public emptyItem():Item{
    return {
			id:null,
			name:'',
			description:'',
		};
  }

  public createForm():FormGroup{
     return this.fb.group({
        "name": [this.item.name],
        "description": [this.item.description],
     });
  }
}
