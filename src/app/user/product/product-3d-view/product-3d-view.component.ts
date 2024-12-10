import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
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
  @ViewChild('modal3dContainer', { static: true }) modal3dContainer!: ElementRef;
  @Output() close = new EventEmitter<void>(); // EventEmitter to close the modal
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private model!: THREE.Object3D;

  ngOnInit(): void {
    console.log('init');
    this.init3DScene();
    this.load3DModel();
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private onWindowResize(): void {
    const width = document.getElementById('modal-3d-container')?.offsetWidth;
    const height = document.getElementById('modal-3d-container')?.offsetHeight;

    if (this.modal3dContainer) {
      console.log('true');
    } else {
      console.log('false');
    }

    console.log(width);
    if (width && height) {
      // Update the renderer size and camera aspect ratio if valid dimensions
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }
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

    this.camera.position.set(0, 0, 5); // Move the camera a bit further back
    this.camera.lookAt(0, 0, 0); // Ensure the camera is looking at the center

    // Set up the WebGL renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document
    //   .getElementById('container-3d')
    //   ?.appendChild(this.renderer.domElement);
    // Ensure the renderer's DOM element is added to the modal container
    const modalContainer = document.getElementById('modal-3d-container'); // Reference the modal's container div

    this.onWindowResize();
    if (modalContainer) {
      modalContainer.appendChild(this.renderer.domElement);
    } else {
      console.log("don't get the modal container!");
    }

    // Set up orbit controls for interactive movement
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  // Close the modal
  onClose(): void {
    this.close.emit();
  }

  // Load a 3D model (e.g., GLTF, OBJ)
  private load3DModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      'http://localhost:5000/uploads/image/3d/studio_headphones.glb', // Path to your 3D model (ensure the path is correct)
      (gltf) => {
        this.model = gltf.scene;

        console.log('Model loaded:', this.model); // Debugging line

        // Add point light (directional light)
        const pointLight = new THREE.PointLight(0xffffff, 300, 100); // White light
        pointLight.position.set(10, 10, 10); // Light position
        this.scene.add(pointLight);

        const ambientLight1 = new THREE.AmbientLight(0x404040, 2); // Soft white light
        this.scene.add(ambientLight1);

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
      //this.model.rotation.y += 0.01;
    }

    // Set the background color (light blue)
    this.renderer.setClearColor(0x87ceeb); // Solid background color
    // Update controls and render
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
