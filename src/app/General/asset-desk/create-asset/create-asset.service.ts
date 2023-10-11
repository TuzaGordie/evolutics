import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/Services/api.service';
import { ClientService } from 'src/app/Services/client.service';
import {
  EValidationType,
  IDocMetadata,
} from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { IAssetSubmitPayload } from '../asset-desk-extras/asset.creation.interface';
import { IAssetDetail } from '../asset-desk-extras/asset.interface';
import { IAssetSearchQuery } from '../asset-desk-extras/asset.search';
import { AssetService } from '../asset-desk-extras/asset.service';

@Injectable({
  providedIn: 'root',
})
export class CreateAssetService {
  documents: KeyValue<File, IDocMetadata>[] = [];
  get baseURL() {
    return environment.apiBaseUrl + '/rest/asset/';
  }
  eValidationType = EValidationType;
  form = new FormGroup({
    asset: new FormGroup({
      aptNoInsured: new FormControl(),
      assetDeclBasis: new FormControl(),
      authDrvNo: new FormControl(),
      category: new FormControl(),
      chasisNo: new FormControl(
        null,
        null,
        this.validateUniqueness.bind(this, 'chasisNo')
      ),
      country: new FormControl(),
      description: new FormControl(),
      engineNo: new FormControl(
        null,
        null,
        this.validateUniqueness.bind(this, 'engineNo')
      ),
      geolocation: new FormControl(),
      imei: new FormControl(),
      insuredPortionBldg: new FormControl(),
      location: new FormControl(),
      locationRegion: new FormControl(),
      mvClient: new FormControl(),
      natureGoods: new FormControl(),
      noAptBldg: new FormControl(),
      noFloors: new FormControl(),
      noRmInsured: new FormControl(),
      ownerClientNo: new FormControl(),
      ownerName: new FormControl(null, Validators.required),
      policy: new FormControl(false),
      propertyType: new FormControl(),
      propertyUsage: new FormControl(),
      purValue: new FormControl(),
      registrationNo: new FormControl(
        null,
        null,
        this.validateUniqueness.bind(this, 'registrationNo')
      ),
      relationship: new FormControl(),
      riskCategory: new FormControl(),
      state: new FormControl(),
      town: new FormControl(),
      trailer: new FormControl(false),
      type: new FormControl(),
      vehicleBrand: new FormControl(),
      vehicleGenre: new FormControl(),
      vehicleMake: new FormControl(),
      vehicleModel: new FormControl(),
      vehicleType: new FormControl(),
      vehicleUsage: new FormControl(),
      vin: new FormControl(),
      yrConstr: new FormControl(),
      yrManuf: new FormControl(),
    }),
    assetSpecification: new FormGroup({
      axle: new FormControl(),
      bodyColour: new FormControl(),
      bodyType: new FormControl(),
      constrStatus: new FormControl(),
      displacement: new FormControl(),
      dualControl: new FormControl(false),
      engineType: new FormControl(),
      fuelType: new FormControl(),
      horsePower: new FormControl(),
      noDoor: new FormControl(),
      noSeat: new FormControl(),
      noValves: new FormControl(),
      surfaceArea: new FormControl(),
      tonnage: new FormControl(),
      transmission: new FormControl(),
      weight: new FormControl(),
      windowType: new FormControl(),
    }),
    assetTracker: new FormGroup({
      tracked: new FormControl(false),
      trackerId: new FormControl(),
    }),
    assetUwQuest: new FormGroup({
      factory: new FormControl(false),
      factoryUsage: new FormControl(),
      fuelStation: new FormControl(false),
      hazardWithinPer: new FormControl(false),
      sawmill: new FormControl(false),
    }),
    assetValue: new FormGroup({
      adjValue: new FormControl(),
      ccy: new FormControl(),
      monthlyRent: new FormControl(),
      mvAdj: new FormControl(),
      mvClient: new FormControl(),
      purValue: new FormControl(),
      estimatedValueByclient: new FormControl(),
      estimatedValueBySystem: new FormControl(),
    }),
    clientRelatedAsset: new FormGroup({
      clientNo: new FormControl(
        null,
        Validators.required,
        this.validateClientNo.bind(this)
      ),
      fullName: new FormControl(),
      relationship: new FormControl(),
    }),
  });
  get asset() {
    return this.form.get('asset') as FormGroup;
  }
  get assetSpecification() {
    return this.form.get('assetSpecification') as FormGroup;
  }
  get assetTracker() {
    return this.form.get('assetTracker') as FormGroup;
  }
  get assetUwQuest() {
    return this.form.get('assetUwQuest') as FormGroup;
  }
  get assetValue() {
    return this.form.get('assetValue') as FormGroup;
  }
  get clientRelatedAsset() {
    return this.form.get('clientRelatedAsset') as FormGroup;
  }
  get hasCountry() {
    return this.asset?.controls?.country?.valid && this.asset?.value?.country;
  }
  get hasRegion() {
    return (
      this.asset?.controls?.locationRegion?.valid &&
      this.asset?.value?.locationRegion
    );
  }
  get hasCurrency() {
    return this.assetValue?.controls?.ccy?.valid && this.assetValue?.value?.ccy;
  }
  get hasState() {
    return this.asset?.controls?.state?.valid && this.asset?.value?.state;
  }
  get hasTown() {
    return this.asset?.controls?.town?.valid && this.asset?.value?.town;
  }
  get propertyUsageIsFactory() {
    return this.asset?.value?.propertyUsage == 'F';
  }
  get isTenant() {
    return this.asset?.value?.relationship == 'T';
  }
  constructor(
    public clientS: ClientService,
    public apiService: ApiService,
    public aS: AssetService
  ) {}
  setTypeAsMotor() {
    this.asset.controls.type.patchValue('M');
  }
  setTypeAsProperty() {
    this.asset.controls.type.patchValue('P');
  }
  init() {}
  patchByModel(code: string) {
    this.aS
      .getDisplacementByModelCode(code)
      .subscribe((r) =>
        this.assetSpecification
          .get('displacement')
          .patchValue(r ? r[0]?.value : null)
      );
    this.aS
      .getHorsePowerByModelCode(code)
      .subscribe((r) =>
        this.assetSpecification
          .get('horsePower')
          .patchValue(r ? r[0]?.value : null)
      );
    this.aS
      .getTonnageByModelCode(code)
      .subscribe((r) =>
        this.assetSpecification
          .get('tonnage')
          .patchValue(r ? r[0]?.value : null)
      );
  }
  private checkIfClientExistsBy = (query: IAssetSearchQuery) => {
    return this.apiService.get<boolean>(this.baseURL + `unique/exists`, query);
  };
  validateUniqueness(field: string, control: AbstractControl) {
    return new Promise<{ notUnique: boolean }>((resolve) => {
      const val = control?.value?.trim();
      if (!val) resolve(null);
      else {
        const query: { [x: string]: string } = {};
        query[field] = val;
        this.checkIfClientExistsBy(query as any)
          .toPromise()
          .then((r) => {
            resolve(r ? { notUnique: true } : null);
          })
          .catch((e) => {
            resolve({ notUnique: true });
          });
      }
    });
  }
  private async validateClientNo(control: AbstractControl) {
    const val = control?.value;
    if (!val) return null;
    return this.clientS
      .getClientViewData(val)
      .toPromise()
      .then((res) => {
        if (!res.clientNo) return { notFound: true };
        if (!res.type) return { notFound: true };
        (control.parent as FormGroup)?.patchValue({ fullName: res.fullName });
        this.asset.patchValue({ ownerName: res.fullName, ownerClientNo: val });
        return null;
      })
      .catch((err) => {
        return { notFound: true };
      });
  }

  reset() {
    this.form.reset();
    this.documents = [];
  }
  createAsset(createAsset: FormData) {
    return this.apiService.postFile<IAssetDetail>(this.baseURL, createAsset);
  }
  getAsset(no: string) {
    return this.apiService.get<IAssetDetail>(this.baseURL + no);
  }
  updateAsset(value: IAssetSubmitPayload, code: string) {
    return this.apiService.post<IAssetDetail>(this.baseURL + 'update/' + code, value);
  }
}
