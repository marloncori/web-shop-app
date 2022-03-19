 import  { Component, Inject, OnInit }  from  '@angular/core';
 import  { TagService }  from  'src/app/services/tag.service';
 import  { Tag }  from  'src/app/models/tag';
 import  { MAT_DIALOG_DATA }  from  '@angular/material/dialog';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})

export class AddTagComponent implements OnInit {
  tag: Tag = {} as Tag;
  showProgressBar = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private tagService: TagService) { }

  ngOnInit(): void {
    if (this.data.idTag != null) {
      this.tagService.findTagById(this.data.idTag).subscribe(tag => {
        this.tag = tag;
      })
    }
  }
  
  tagObserver = {
    next: (tag: Tag) => {
      this.tag = tag;
      window.location.reload();
    },
    error: (err: Error) => alert(err.message),
    complete: () => console.log("Data has been loaded.")
  };

  addTag() {
    this.showProgressBar = true;
    if (this.data.idTag != null) {
      this.tagService.editTag(this.tag, this.data.idTag)
                                .subscribe(this.tagObserver)
     } else {
      this.tagService.addTag(this.tag)
                                .subscribe(this.tagObserver)
    }
  }

}
  