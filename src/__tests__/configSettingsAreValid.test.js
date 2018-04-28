import { configSettingsAreValid } from '..';

describe('configSettingsAreValid function', () => {
  it('approves of valid objects', () => {
    expect(configSettingsAreValid({}, {})).toBe(true);
  });
});
