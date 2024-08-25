import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';

export function close(router: Router) {
  router.navigate(['/home']);
}

export function goBack(location: Location) {
  location.back();
}

export function goToNextScreen(nextScreenUrl$: Observable<string | null>, router: Router) {
  nextScreenUrl$.subscribe(nextUrl => {
    if (nextUrl) {
      router.navigate([`/${nextUrl}`]);
    }
  });
}

export function extractPhaseIdFromCurrentUrl(router: Router): number {
  const currentUrl = router.url;
  const segments = currentUrl.split('/');

  if (segments.length > 2) {
    const phaseIdStr = segments[2];
    const phaseId = parseInt(phaseIdStr, 10);
    return isNaN(phaseId) ? 0 : phaseId;
  }

  return 0;
}
