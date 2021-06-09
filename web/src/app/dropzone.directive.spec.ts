import { DropzoneDirective } from './dropzone.directive';
import { MessagesService } from './services/messages.service';

describe('DropzoneDirective', () => {
  it('should create an instance', () => {
    const directive = new DropzoneDirective();
    expect(directive).toBeTruthy();
  });
});
