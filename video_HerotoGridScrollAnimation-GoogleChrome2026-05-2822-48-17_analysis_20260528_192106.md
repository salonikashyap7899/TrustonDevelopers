The gallery scroll animation features a dynamic transition between a multi-image grid and a full-screen hero section. Here is a detailed breakdown of the animation:

### **Transition from Grid to Hero (Scrolling Down)**
*   **Focal Point Expansion:** The central image—a modern white house with a pool—acts as the anchor. As you scroll down, this image scales up smoothly to fill the entire viewport.
*   **Grid Dispersion:** The four surrounding images (two on the left, two on the right) move outwards away from the center as they fade or move off-screen, creating a "zoom-in" effect on the central piece.
*   **Text Reveal:** Once the central image expands to fill the screen, the text **"SPACES WHERE LIFE Unfolds"** fades into view. The word "Unfolds" is styled in a serif italic font, contrasting with the clean sans-serif of the top line.

### **Transition from Hero back to Grid (Scrolling Up)**
*   **Reverse Scaling:** Scrolling back up causes the full-screen image to shrink back into its original central position within the grid.
*   **Re-convergence:** The surrounding four images move back toward the center from the edges of the screen, perfectly realigning into their initial grid layout.
*   **Text Fade-out:** The overlay text disappears as the image begins to scale down, ensuring the focus remains on the visual transition.

### **Key Animation Characteristics**
*   **Scroll-Linked:** The animation is non-linear and directly tied to the user's scroll progress. The faster you scroll, the faster the transition occurs.
*   **Smooth Interpolation:** The movement of the images and the scaling effect are fluid, suggesting the use of a library like GSAP (GreenSock) or Framer Motion to handle the transform and opacity changes.
*   **Depth Effect:** By moving the outer images away while scaling the center one, the animation creates a sense of depth, drawing the viewer "into" the featured space.