import { Component, Inject, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tag-to-product',
  templateUrl: './add-tag-to-product.component.html',
  styleUrls: ['./add-tag-to-product.component.css']
})

export class AddTagToProductComponent implements OnInit {
  tags: Tag[] = [];
  filterTags: Tag[] = [];
  foundTag: Tag | undefined;

  tagsObserver = {
    next: (filterTags: Tag[]) => {
         this.filterTags = filterTags;
         this.filterTags.forEach(t => {
           this.tags = this.tags.filter(item => item.id !== t.id);
         })
      },
    error: (err: Error) => alert(err.message),
    complete: () => console.log("All the data has been successfully loaded.")
  };
  
  tagServiceObserver = {
      next: (tags: Tag[]) => {
        this.tags = tags;
        this.tagService.findTagsForProduct(this.data.idProduct)
                              .subscribe(this.tagsObserver);
      },
      error: (err: Error) => alert(err.message),
      complete: () => console.log("Tags have been loaded.")
  };
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private tagService: TagService) { }

  ngOnInit(): void {
    this.tagService.findAllTags()
                      .subscribe(this.tagServiceObserver);
  }

  valueObserver = {
    next: () => window.location.reload(),
    error: (err: Error) => alert(err.message),
    complete: () => console.log('The value has been processed')
  };

  selectedValue(event: any) {
    const idTag = event.value;
    this.tagService.findTagById(idTag)
                    .subscribe((data) => this.foundTag = data);
    this.tagService.addTagToProduct(this.foundTag!, this.data.idProduct, idTag)
                                    .subscribe(this.valueObserver)
  }

}
