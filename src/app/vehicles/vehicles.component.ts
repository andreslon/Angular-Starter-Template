import { Observable } from 'rxjs/Rx';
import { serialize } from 'parse5/lib';
import { isSuccess } from '@angular/http/src/http_utils';
import { DialogService } from './../controls/dialog/dialog.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { VehiclesService } from './vehicles.service';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatSnackBar } from '@angular/material';
import { debug } from 'util';


@Component({
	selector: 'vehicles',
	styleUrls: ['vehicles.component.scss'],
	templateUrl: 'vehicles.component.html',
	providers: [VehiclesService]
})
export class VehiclesComponent {
	public displayedColumns = ['Icon', 'Name', 'VinNumber', 'DeviceSerial', 'ServiceCode'];
	public dataSource: MatTableDataSource<VehiclesObj>;

	@ViewChild(MatPaginator) public paginator: MatPaginator;
	@ViewChild(MatSort) public sort: MatSort;

	popoverNameStrings: any;
	popoverVinStrings: any;

	constructor(
		public vehiclesService: VehiclesService,
		private translateService: TranslateService,
		private iconRegistry: MatIconRegistry,
		private snackBar: MatSnackBar,
		private dialogService: DialogService,
		private sanitizer: DomSanitizer) {

		iconRegistry.addSvgIcon(
			'vehicle',
			sanitizer.bypassSecurityTrustResourceUrl('./../../assets/img/ic-vehiculo.svg'));
	}
	updateName(obj: VehiclesObj, name: string) {
		if (name == null) { return; }
		obj.isBusyName = true;
		let lastName = obj.Name;
		obj.Name = name;
		this.updateVehicle(obj, (result) => {
			obj.isBusyName = false;
			if (result) {
				this.translateService.get('common.successName')
					.subscribe((res: any) => {
						this.showSnackBar(res);
					});
			} else {
				obj.Name = lastName;
			}
		});
	}
	updateVin(obj: VehiclesObj, vin: string) {
		if (vin == null) { return; }
		obj.isBusyVin = true;
		let lastVin = obj.VinNumber;
		obj.VinNumber = vin;
		this.updateVehicle(obj, (result) => {
			obj.isBusyVin = false;
			if (result) {
				this.translateService.get('common.successVin')
					.subscribe((res: any) => {
						this.showSnackBar(res);
					});
			} else {
				obj.VinNumber = lastVin;
			}
		});
	}
	showSnackBar(message: string) {
		this.snackBar.open(message, '', {
			duration: 5000,
			verticalPosition: 'top',
			horizontalPosition: 'center',
			extraClasses: ['success-snackbar']
		});
	}

	updateVehicle(obj: VehiclesObj, fn) {

		if (!navigator.onLine) {
			this.translateService.get('common.offline')
				.subscribe((res: any) => {
					this.dialogService.show(res);
				});
			fn(false);
			return;
		}

		this.vehiclesService.UpdateVehicle(obj).then((response) => { 
			if (response.isSuccess
				&& response.result != null
				&& response.result != '00000000-0000-0000-0000-000000000000') {
				if(obj.Id!= response.result){
					obj.Id=response.result;
				}
				fn(true);
			} else {
				fn(false);
				let msg = response.exception;
				if (msg.indexOf('already exists') >= 0) {
					this.translateService.get('vehicles.messages.nameExist')
						.subscribe((res: any) => {
							this.dialogService.show(res);
						});
				} else {
					this.dialogService.show(response.exception);
				}
			}
		});
	}

	ngAfterViewInit() {

		this.vehiclesService.getVehiclesByUser(sessionStorage.getItem('userName')).then((data) => {  
			if (data.ok || data.length > 0) {
				let servicesCode = [];

				data.forEach((element) => {
					servicesCode.push(element.Placa);
				}); 
				this.vehiclesService.getVehiclesByServiceCodes(servicesCode).then((response) => {
					if (response.ok || Object.prototype.toString.call(response) === '[object Array]') {
						const vehicles: VehiclesObj[] = [];
						response.forEach((element) => {
							vehicles.push(createVehicle(element));
						});
						this.dataSource = new MatTableDataSource(vehicles);
						this.dataSource.paginator = this.paginator;
						this.dataSource.sort = this.sort;
					} else {
						this.dialogService.show(
							response._body ? response._body.replace(/['"]+/g, '') : response);
					}
				});
			} 
			else if(data!=null && data.length==0){

			}
			else {
				this.dialogService.show(data.statusText);
			}
		});
		this.translateService.get([
			'common.itemsPerPage',
			'common.nextPage',
			'common.previousPage',
			'vehicles.vehicleName',
			'vehicles.messages.nameInfo',
			'vehicles.messages.nameRequired',
			'vehicles.vinNumber',
			'vehicles.messages.vinInfo',
			'vehicles.messages.vinRequired',
		])
			.subscribe((res: any) => {
				this.paginator._intl.itemsPerPageLabel = res['common.itemsPerPage'];
				this.paginator._intl.nextPageLabel = res['common.nextPage'];
				this.paginator._intl.previousPageLabel = res['common.previousPage'];
				this.popoverNameStrings = {
					title: res['vehicles.vehicleName'],
					requiredText: res['vehicles.messages.nameRequired'],
					InfoText: res['vehicles.messages.nameInfo'],
				};
				this.popoverVinStrings = {
					title: res['vehicles.vinNumber'],
					requiredText: res['vehicles.messages.vinRequired'],
					InfoText: res['vehicles.messages.vinInfo'],
				};
			});
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}
}
function createVehicle(vehicle): VehiclesObj {
	return {
		Id: vehicle.id,
		Name: vehicle.name,
		VinNumber: vehicle.vinNumber,
		DeviceSerial: vehicle.deviceSerial,
		ServiceCode: vehicle.serviceCode,
		State: vehicle.state,
		isBusyName: false,
		isBusyVin: false,
	};
}
export interface VehiclesObj {
	Id: string;
	Name: string;
	VinNumber: string;
	DeviceSerial: string;
	ServiceCode: string;
	State: string;
	isBusyName: boolean;
	isBusyVin: boolean;
}


