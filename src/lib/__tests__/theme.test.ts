import { readThemeColors } from '@/lib/theme';

describe('readThemeColors', () => {
  it('reads the color tokens from the theme', async () => {
    const colors = await readThemeColors();

    expect(colors['primary-blue']).toBe('#3157f6');
    expect(colors['background-light-yellow']).toBe('#f9f8f3');
    expect(colors['text-secondary']).toBe('#656770');
  });
});
