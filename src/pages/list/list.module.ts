import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { ListPage } from './list';

@NgModule({
    declarations: [ListPage],
    imports: [IonicPageModule.forChild(ListPage)]
})
export class ListModule {
}