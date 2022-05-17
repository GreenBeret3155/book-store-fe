import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IProfileConfig} from '../../../../shared/model/profileConfig.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {ProfileConfigService} from '../../../../shared/services/profile-config.service';
import {customerNumberValidator} from '../../../../shared/directives/custome-number.directive';
import {onlyCharacterValidator} from '../../../../shared/directives/only-characters.directive';
import {NbIconConfig, NbToastrService} from '@nebular/theme';
import {CatItemServiceService} from '../../../../shared/services/cat-item-service.service';

@Component({
  selector: 'ngx-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileInfo: FormGroup;
  profileTypes: any[];

  constructor(private fb: FormBuilder, public activatedRoute: ActivatedRoute, protected router: Router,
              private profileService: ProfileConfigService, private toastrService: NbToastrService, private catItemService: CatItemServiceService
  ) {
  }

  private isSaving: boolean;

  ngOnInit() {
    this.profileInfo = this.fb.group({
      id: null,
      profileCode: [null, [Validators.required, Validators.maxLength(160), onlyCharacterValidator(/^[a-zA-Z0-9_]{1,}$/)]],
      profileName: [null, [Validators.required, Validators.maxLength(330)]],
      isDefault: [null, Validators.required],
      orderIndex: [null, [customerNumberValidator(/^[0-9]{1,}$/)]],
      type: [null, [Validators.required]],
      roleCode: null,
      status: null,
      description: [null, Validators.maxLength(1500)],
      updateTime: null,
      updateUser: null
    });
    this.initProfileType();
    this.activatedRoute.data.subscribe(({profile}) => {
      this.updateForm(profile);
    });
  }

  saveProfile() {
    console.info('Save Data', this.profileInfo.value);
    this.isSaving = true;
    const book = this.profileInfo.getRawValue();
    book.status = 1;
    if (book.id !== undefined) {
      this.subscribeToSaveResponse(this.profileService.update(book));
    } else {
      this.subscribeToSaveResponse(this.profileService.create(book));
    }
  }

  private initProfileType() {
    this.catItemService.getCatItemByCategoryCode('PROFILE_TYPE').subscribe(res => {
      this.profileTypes = res.body ? res.body : [];
      // if (this.profileTypes) {
      //   this.profileInfo.get('type').patchValue(this.profileTypes[0].itemValue);
      // }
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfileConfig>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      (errors) => this.onSaveError(errors.error.message)
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    // alert('Lưu lại thành công!');
    const iconConfig: NbIconConfig = {icon: 'checkmark-outline', pack: 'eva'};
    this.toastrService.primary('Lưu thành công!', 'Thông báo', iconConfig)
    this.router.navigate(['/pages/dynamic-config/profile']);
  }

  cancel() {
    this.router.navigate(['/pages/dynamic-config/profile']);
  }

  protected onSaveError(errors): void {
    // alert(errors);
    const iconConfig: NbIconConfig = {icon: 'alert-circle-outline', pack: 'eva'};
    this.toastrService.warning(errors, 'Thông báo', iconConfig)
    this.isSaving = false;
  }

  private updateForm(profile: IProfileConfig) {
    this.profileInfo.patchValue({
      id: profile.id,
      profileCode: profile.profileCode,
      profileName: profile.profileName,
      isDefault: profile.isDefault,
      orderIndex: profile.orderIndex,
      roleCode: profile.roleCode,
      status: profile.status,
      description: profile.description,
      updateTime: profile.updateTime,
      type: profile.type ? profile.type + '' : '1',
      updateUser: profile.updateUser
    });
  }
}
