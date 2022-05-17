import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../@core/user/user.model';
import {UserService} from '../../../@core/user/user.service';
import {Language} from '../../../@core/model/language.model';
import {CatItemServiceService} from '../../../shared/services/cat-item-service.service';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {CategoryId} from '../../../shared/common.constant';
import {onlyCharacterValidator} from '../../../shared/directives/only-characters.directive';
import {ToasterService} from "angular2-toaster";
import {RoleService} from '../../../shared/services/role.service';

@Component({
  selector: 'ngx-user-config-update',
  templateUrl: './user-config-update.component.html',
  styleUrls: ['./user-config-update.component.scss']
})
export class UserConfigUpdateComponent implements OnInit {
  @Input() user: User;
  languages: Language[];
  authorities: any[];
  domainData: any[];
  itemRoles;
  userInfo: FormGroup = this.fb.group({
    id: [null],
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), onlyCharacterValidator(/^[a-zA-Z0-9_]{1,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName: ['', [Validators.required, Validators.maxLength(50)]],
    phone: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    activated: [true],
    alarmLeader: [false],
    langKey: ['', Validators.required],
    authorities: [null, Validators.required],
    domains: [null]
  }, {
    validators: this.MustMatch('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder,
              // public activatedRoute: ActivatedRoute,
              protected router: Router,
              private userService: UserService,
              private catItemServiceService: CatItemServiceService,
              private dialogService: NbDialogService,
              private toastrService: ToasterService,
              private roleService: RoleService,
              protected ref: NbDialogRef<UserConfigUpdateComponent>
  ) {
  }

  ngOnInit() {

    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities
    });
    this.roleService.getAllRole().subscribe(value => this.itemRoles = value.body);
    this.languages = this.getAll();
    this.userInfo.get('langKey').patchValue(this.languages[0].langKey);

    this.catItemServiceService.fetch(CategoryId.DOMAIN).subscribe(domains => {
      this.domainData = domains
    });

    if (this.user !== undefined && this.user !== null) {
      this.userInfo = this.fb.group({
        id: [null],
        login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), onlyCharacterValidator(/^[a-zA-Z0-9_]{1,}$/)]],
        password: [''],
        confirmPassword: [''],
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        phone: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*')]],
        email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
        activated: [true],
        alarmLeader: [false],
        langKey: ['', Validators.required],
        authorities: [null, Validators.required],
        domains: [null]
      });
      this.userService.find(this.user.login).subscribe(res => {
        this.userInfo.patchValue(res.body);
      });
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control && matchingControl) {
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
          matchingControl.setErrors({mustMatch: true});
        } else {
          matchingControl.setErrors(null);
        }
      }
    }
  }

  getAll(): Language[] {
    const langs: Language[] = [
      {langKey: 'vi', langTitle: 'Tiếng Việt'},
      {langKey: 'en', langTitle: 'Tiếng Anh'}
    ];
    return langs;
  }

  dismiss() {
    this.ref.close({result: 'close'});
  }

  // private updateForm(user: User): void {
  //   this.userInfo.patchValue({
  //     id: user.id,
  //     login: user.login,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     activated: user.activated,
  //     alarmLeader: user.alarmLeader,
  //     langKey: user.langKey,
  //     authorities: user.authorities,
  //     domains: user.domains,
  //     phone: user.phone
  //   });
  //   if (user.id !== null && user.id !== undefined) {
  //     this.userInfo.removeControl('password');
  //     this.userInfo.removeControl('confirmPassword');
  //   }
  // }

  onSave() {
    this.dialogService.open(ConfirmDialogComponent, {
      context: {
        title: 'Xác nhận thông tin',
        message: 'Bạn có chắc chắn muốn lưu thông tin không?'
      },
    }).onClose.subscribe(res => this.save(res));
  }

  save(confirm) {
    if (confirm) {
      // this.user = this.userInfo.getRawValue();
      // this.updateUser(this.user);
      if (this.userInfo.get('id').value !== null) {
        this.userService.update(this.userInfo.value).subscribe(() => this.onSaveSuccess(true), error => this.onSaveError(true, error));
      } else {
        this.userService.create(this.userInfo.value).subscribe(() => this.onSaveSuccess(false), error => this.onSaveError(false, error));
      }
    }
  }

  // private updateUser(user: User): void {
  //   if (user.id !== null && user.id !== undefined) {
  //     // Truong hop cap nhat thi khong duoc phep cap nhat password
  //     user.password = null;
  //   } else {
  //     // Truong hop them moi thi phai nhap mat khau
  //     user.password = this.userInfo.get(['password']).value;
  //   }
  // }

  private onSaveSuccess(isUpdate) {
    this.ref.close({result: 'complete'});
    if (isUpdate) {
      this.toastrService.pop('success', 'Thông báo', 'Cập nhật thành công');
    } else {
      this.toastrService.pop('success', 'Thông báo', 'Thêm mới thành công');
    }
  }

  private onSaveError(isUpdate, error) {
    if (error.status === 403) {
      this.toastrService.pop('error', 'Thông báo', 'Bạn không có quyền thực hiện thao tác');
    } else if (isUpdate) {
      this.toastrService.pop('error', 'Thông báo', error.error.title);
    } else {
      this.toastrService.pop('error', 'Thông báo', error.error.title);
    }
  }

}
