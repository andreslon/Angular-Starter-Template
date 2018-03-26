import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

/**
 * Load the implementations that should be tested.
 */
import { VehiclesComponent } from './vehicles.component';

describe('Vehicles', () => {
  /**
   * Provide our implementations or mocks to the dependency injector
   */
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      /**
       * Provide a better mock.
       */
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      VehiclesComponent
    ]
  }));

  it('should log ngOnInit', inject([VehiclesComponent], (vehicles: VehiclesComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    vehicles.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
