import { any } from 'codelyzer/util/function';
import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType } from '@angular/http';
import { Subject } from 'rxjs/Subject';

//Development
//const vehiclesApiUri: string = 'http://localhost:5000/';

//Production
// const vehiclesApiUri: string = 'http://vehappapivehiculo.satrack.com/';
// const locationApiUri: string = 'http://w2applocation.satrack.com/services/';

//Testing
const vehiclesApiUri: string = 'http://testvehappapivehiculo.azurewebsites.net/';
const locationApiUri: string = 'http://testw3applocation.azurewebsites.net/services/';
 
@Injectable()
export class VehiclesService {
	public isBusy: boolean = true;
	constructor(private http: Http) { }

	public getVehiclesByServiceCodes(serviceCodes) {
		let url = vehiclesApiUri + 'api/v1/Vehicles';
		this.isBusy = true;
		let body = serviceCodes;
		return this.http.post(url, body, {
			headers: new Headers({ Authorization: 'Bearer ' + sessionStorage.getItem('userToken') })
		})
			.map((res) => res.json())
			.toPromise()
			.then(
			(data) => {
				this.isBusy = false;
				return data;
			},
			(reason) => {
				this.isBusy = false;
				return reason;
			});
	}
	public UpdateVehicle(data: any) {
		let url = vehiclesApiUri + 'api/v1/Vehicles';
		let body = data;
		return this.http.put(url, body, {
			headers: new Headers({ Authorization: 'Bearer ' + sessionStorage.getItem('userToken') })
		})
			.map((res) => res.json())
			.toPromise()
			.then(
			(data) => { return data; },
			(reason) => { return reason; });
	}
	public getVehiclesByUser(userName: string) {
		let url = locationApiUri + 'api/VehiculosUsuario/GetVehiculosxUsuario?usuario=' + userName;
		this.isBusy = true;
		return this.http
			.get(url, {
				headers: new Headers({ Authorization: 'Bearer ' + sessionStorage.getItem('userToken') })
			})
			.map((res) => res.json())
			.toPromise()
			.then(
			(data) => {
				this.isBusy = false;
				return data;
			},
			(reason) => {
				this.isBusy = false;
				return reason;
			}
			);
	}
}
