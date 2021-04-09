import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { ToastConfig, defaultToastConfig, ToastData } from '@shared/components/toast/toast-config';
import { ToastRef } from '@shared/components/toast/toast-ref';
import { toastAnimations, ToastAnimationState } from '@shared/components/toast/toast-animation';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [toastAnimations.fadeToast]
})
export class ToastComponent implements OnInit, OnDestroy {

  animationState: ToastAnimationState = 'default';
  iconType: string = '';
  isSuccess: boolean;
  isWarning: boolean;
  isInfo: boolean;
  isError: boolean;

  fadeIn: number = 0;
  fadeOut: number = 0;

  private intervalId: any;
  public toastConfig: ToastConfig = defaultToastConfig;
  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    ) {
      this.isSuccess = data.type  === 'success' ? true : false;
      this.isWarning = data.type  === 'warning' ? true : false;
      this.isInfo = data.type  === 'info' ? true : false;
      this.isError = data.type  === 'error' ? true : false;

      this.fadeIn = this.toastConfig.animation?.fadeIn || 0;
      this.fadeOut = this.toastConfig.animation?.fadeOut || 0;
  }

  ngOnInit() {
    this.intervalId = setTimeout(() => this.animationState = 'closing', 3000);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  close() {
    this.ref.close();
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }
}
