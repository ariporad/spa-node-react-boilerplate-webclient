/**
 * Created by Ari on 7/26/15.
 */
import { jsdom } from 'jsdom';

const html = '<!DOCTYPE html><html><head></head><body></body></html>';

global.document = jsdom(html);
global.window = document.defaultView;
global.navigator = window.navigator;