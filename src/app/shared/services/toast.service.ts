import { Injectable, Injector } from '@angular/core';
import { defaultToastConfig, ToastData } from '@shared/components/toast/toast-config';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { ToastRef } from '@shared/components/toast/toast-ref';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast: ToastRef | undefined;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
  ) { }

  show(data: ToastData) {

    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  getPositionStrategy() {
    return this.overlay.position()
      .global()
      .top(this.getPosition())
      .right(defaultToastConfig.position?.right + 'px');
  }

  getPosition() {
    let position = defaultToastConfig.position?.top;
    if (typeof this.lastToast !== 'undefined') {
      const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
      position = lastToastIsVisible !== null
        ? this.lastToast.getPosition().bottom
        : defaultToastConfig.position?.top;
    }

    return position + 'px';
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }
}
