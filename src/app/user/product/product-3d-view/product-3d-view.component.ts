import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-product-3d-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-3d-view.component.html',
  styleUrl: './product-3d-view.component.scss',
})
export class Product3dViewComponent {
  @Input() isOpen: boolean = false; // Input to control modal visibility
  @Output() close = new EventEmitter<void>(); // EventEmitter to close the modal

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Object3D;

  onClose() {
    this.close.emit(); // Emit event to parent to close the modal
  }

  ngOnInit(): void {
    this.init3DScene();
    this.load3DModel();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  ngOnDestroy(): void {
    if (this.renderer) {
      this.renderer.dispose();
    }
    window.removeEventListener('resize', this.onWindowResize); // Clean up on destroy
  }

  // Initialize the 3D scene
  private init3DScene(): void {
    this.scene = new THREE.Scene();

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.z = 2;

    // Set up the WebGL renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById('container-3d')
      ?.appendChild(this.renderer.domElement);

    // Set up orbit controls for interactive movement
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  // Load a 3D model (e.g., GLTF, OBJ)
  private load3DModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      'http://localhost:5000/uploads/image/3d/headphones_free_model_by_oscar_creative (1).glb', // Path to your 3D model (ensure the path is correct)
      (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
        this.animate();
      },
      undefined,
      (error) => {
        console.error('Error loading model', error);
      },
    );
  }

  // Animation loop for rendering the scene
  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Rotate the model for a dynamic effect (optional)
    if (this.model) {
      this.model.rotation.y += 0.01;
    }

    // Update controls and render
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
