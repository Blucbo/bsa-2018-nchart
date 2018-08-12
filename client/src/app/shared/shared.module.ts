import { NgModule } from '@angular/core';
import { UIKitModule } from '@app/shared/uikit.module';
import { ActionButtonComponent } from './components/button/action-button/action-button.component';
import { TabsGroupComponent } from './components/tabs/tabs-group/tabs-group.component';
import { FormFieldModule } from './components/form-field/form-field.module';

@NgModule({
	imports: [UIKitModule, FormFieldModule],
	exports: [ActionButtonComponent, TabsGroupComponent, FormFieldModule],
	declarations: [ActionButtonComponent, TabsGroupComponent]
})
export class SharedModule {}
